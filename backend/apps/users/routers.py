import http
from datetime import timedelta
from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from starlette import status
from starlette.status import HTTP_401_UNAUTHORIZED

from apps.core import schemas as core_schemas
from conf.database import get_db
from utils.response_utils import create_response
from . import schemas, services
from .services import get_current_user
from .models import User


router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

REFRESH_TOKEN_EXPIRE_DAYS = 365
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days


@router.post("/signup/", response_model=schemas.UserReturn)
def signup(user_data: schemas.UserCreate, db: Session = Depends(get_db)):
    """
    Add new user
    """
    user = services.get_user_by_email(db, user_data.email)
    if user:
        raise HTTPException(
            status_code=http.HTTPStatus.CONFLICT,
            detail="Email already exists.",
        )
    new_user = services.create_user(db, user_data)
    user_create_response = schemas.UserCreate.model_validate(new_user).model_dump(
        exclude={"password"}
    )
    user_create_response["id"] = new_user.id
    return create_response(
        data=user_create_response,
        message="User created successfully",
        status_code=http.HTTPStatus.CREATED,
    )


@router.post("/login/", response_model=schemas.Token)
def login(
    input_data: schemas.UserLogin,
    db: Session = Depends(get_db),
    # form_data: schemas.OAuth2PasswordRequestFormEmail = Depends(),
):
    """
    Generate access token for valid credentials
    """
    user = services.authenticate_user(db, input_data.email, input_data.password)
    if not user:
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = services.create_access_token(
        data={
            "sub": user.email,
            "id": user.id,
            "email": user.email,
            "is_admin": user.is_admin,
            "is_instructor": user.is_instructor,
        },
        expires_delta=access_token_expires,
    )
    # Refresh Token
    refresh_token_expires = timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)  # longer lifespan
    refresh_token = services.create_refresh_token(
        data={
            "sub": user.email,
            "id": user.id,
            "email": user.email,
            "is_admin": user.is_admin,
            "is_instructor": user.is_instructor,
        },
        expires_delta=refresh_token_expires,
    )

    return create_response(
        data={
            "access": access_token,
            "refresh": refresh_token,
            "token_type": "bearer",
        },
        message="User logged in successfully",
    )


@router.get(
    "/me",
    summary="Get details of currently logged in user",
    response_model=core_schemas.BaseReturn[schemas.UserReturn],
)
async def get_me(user: User = Depends(get_current_user)):
    user_return = dict(
        id=user.id,
        email=user.email,
        name=user.name,
        username=user.username,
        bio=user.bio,
        website=user.website,
        avatar=user.avatar,
    )
    return create_response(data=user_return, message="User details")


@router.post("/token/refresh/", response_model=schemas.Token)
def refresh_access_token(
    refresh_request: schemas.RefreshTokenRequest, db: Session = Depends(get_db)
):
    """
    Endpoint to refresh an access token using a refresh token.
    """
    # Verify the refresh token
    email = services.verify_refresh_token(refresh_request.refresh_token)
    if not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Fetch the user based on the email obtained from the refresh token
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    # Create a new access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = services.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )

    return create_response(
        data={"access_token": access_token, "token_type": "bearer"},
        message="Token generated",
    )


@router.get("/dashboard/statistics")
async def get_dashboard_statistics(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    """
    Get dashboard statistics
    """
    statistics = await services.get_dashboard_statistics(db, current_user.id)
    return create_response(data=statistics)


@router.put(
    "/profile", response_model=core_schemas.BaseReturn[schemas.UserUpdateResponse]
)
async def update_profile(
    profile_data: schemas.UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Update user profile
    """
    print(profile_data)
    updated_user = await services.update_user(db, current_user.id, profile_data)
    user_dict = {
        "id": updated_user.id,
        "email": updated_user.email,
        "name": updated_user.name,
        "bio": updated_user.bio,
        "website": updated_user.website,
        "avatar": updated_user.avatar,
    }
    return create_response(data=user_dict)


@router.get(
    "/user-info/{username}", response_model=core_schemas.BaseReturn[schemas.UserInfo]
)
async def get_user_info(
    username: str,
    db: Session = Depends(get_db),
):
    """
    Get user info by username
    """
    user = (
        db.query(User).filter(User.username == username, User.is_active == True).first()
    )
    if not user:
        return create_response(data=None, message="User not found")
    return create_response(
        data={
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "username": user.username,
            "bio": user.bio,
            "website": user.website,
            "avatar": user.avatar,
            "is_instructor": user.is_instructor,
        }
    )


@router.get("/instructor-courses/{user_id}")
async def get_instructor_courses(
    user_id: int,
    db: Session = Depends(get_db),
):
    """
    Get instructor courses by user_id
    """
    courses = await services.get_instructor_courses(db, user_id)
    return create_response(data=courses)


@router.get("/instructor-stats/{user_id}")
async def get_instructor_stats(
    user_id: int,
    db: Session = Depends(get_db),
):
    """
    Get instructor stats by user_id
    """
    stats = await services.get_instructor_stats(db, user_id)
    return create_response(data=stats)
