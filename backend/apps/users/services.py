from datetime import datetime, timedelta, timezone
from typing import Optional

from fastapi import Depends, HTTPException
from jwt import ExpiredSignatureError, InvalidTokenError, PyJWTError
from sqlalchemy.orm import Session
from starlette.status import HTTP_401_UNAUTHORIZED
import jwt
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from sqlalchemy import func
from apps.courses import models as course_models
from apps.users import models as user_models
from apps.enrollments import models as enrollment_models
from apps.checkout import models as checkout_models
from apps.lessons import models as lesson_models

from conf.database import get_db
from . import models, schemas

from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/login",
    scheme_name="JWT",
    auto_error=False,
    scopes=None,
    description="JWT token authentication",
)

SECRET_KEY = "secret"
ALGORITHM = "HS256"


def create_access_token(*, data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def create_refresh_token(*, data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        # Default expiration time for a refresh token can be longer than for access tokens
        expire = datetime.now(timezone.utc) + timedelta(days=30)  # Example: 30 days

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_refresh_token(token: str) -> Optional[str]:
    try:
        # Decode the token
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        # Check if the token has expired
        if decoded_token.get("exp") and datetime.fromtimestamp(
            decoded_token["exp"], timezone.utc
        ) < datetime.now(timezone.utc):
            return None

        # Extract user identity or other relevant information
        return decoded_token.get(
            "sub"
        )  # 'sub' is typically used for the subject (user identifier)

    except ExpiredSignatureError:
        # Handle expired token
        print("Token has expired")
        return None
    except InvalidTokenError:
        # Handle invalid token
        print("Invalid token")
        return None


def decode_access_token(db: Session, token: str) -> models.User:
    """
    Decode and validate JWT access token.
    
    Args:
        db: Database session
        token: JWT token string
        
    Returns:
        User model instance
        
    Raises:
        HTTPException: If token is invalid, expired, or user not found
    """
    credentials_exception = HTTPException(
        status_code=HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise credentials_exception
    except ExpiredSignatureError:
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except (InvalidTokenError, PyJWTError):
        raise credentials_exception
        
    user = get_user_by_email(db, email=email)
    if user is None:
        raise credentials_exception
    return user


def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
):
    return decode_access_token(db, token)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def authenticate_user(db, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)

    db_user = models.User(
        name=user.name,
        username=user.username,
        email=user.email,
        password=hashed_password,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_password(db: Session, email: str):
    user = db.query(models.User).filter(models.User.email == email).first()
    return user.hashed_password


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def get_user_posts(db: Session, user_id: int):
    return db.query(models.Post).filter(models.Post.owner_id == user_id).all()


async def get_dashboard_statistics(db: Session, user_id: int):
    # Get total enrolled courses
    total_enrolled_courses = db.query(func.count(enrollment_models.Enrollment.id)).filter(
        enrollment_models.Enrollment.user_id == user_id
    ).scalar() or 0
    
    # Get total completed courses
    total_completed_courses = db.query(func.count(enrollment_models.Enrollment.id)).filter(
        enrollment_models.Enrollment.user_id == user_id,
        enrollment_models.Enrollment.completed == True
    ).scalar() or 0
    
    # Get total lessons completed
    total_lessons_completed = db.query(func.count(enrollment_models.Enrollment.id)).filter(
        enrollment_models.Enrollment.user_id == user_id
    ).scalar() or 0
    
    # Get total time spent learning (in minutes)
    total_time_spent = 0
    
    # Get certificates earned
    certificates_earned = db.query(func.count(enrollment_models.Enrollment.id)).filter(
        enrollment_models.Enrollment.user_id == user_id,
        enrollment_models.Enrollment.certificate_issued == True
    ).scalar() or 0
    
    current_time = datetime.now(timezone.utc)

    one_weeks_ago = current_time - timedelta(weeks=1)
    
    # Get recent activity (last 7 days)
    recent_activity = db.query(func.count(enrollment_models.LessonCompletion.id)).filter(
        enrollment_models.LessonCompletion.user_id == user_id,
        enrollment_models.LessonCompletion.completed_at >= one_weeks_ago
    ).scalar() or 0
    
    return {
        "total_enrolled_courses": total_enrolled_courses,
        "total_completed_courses": total_completed_courses,
        "total_lessons_completed": total_lessons_completed,
        "total_time_spent": total_time_spent,
        "certificates_earned": certificates_earned,
        "recent_activity": recent_activity
    }
