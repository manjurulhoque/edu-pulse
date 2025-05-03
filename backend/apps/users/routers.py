import http
from datetime import timedelta

from fastapi import APIRouter, Depends, Form, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from starlette import status
from starlette.status import HTTP_401_UNAUTHORIZED

from conf.database import get_db
from utils.response_utils import create_response
from . import schemas, services
from .services import get_current_user, get_password_hash, verify_password
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
        data={"sub": user.email, "id": user.id, "email": user.email},
        expires_delta=access_token_expires,
    )
    # Refresh Token
    refresh_token_expires = timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)  # longer lifespan
    refresh_token = services.create_refresh_token(
        data={"sub": user.email, "id": user.id, "email": user.email},
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
    response_model=schemas.UserReturn,
)
async def get_me(user: User = Depends(get_current_user)):
    return user


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
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )
    
    statistics = await services.get_dashboard_statistics(db, current_user.id)
    return create_response(data=statistics)
