from datetime import timedelta
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session
from starlette.status import HTTP_401_UNAUTHORIZED

from conf.database import get_db
from utils.response_utils import create_response
from . import schemas, helpers

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


@router.post("/signup/", response_model=schemas.UserCreate)
def signup(user_data: schemas.UserCreate, db: Session = Depends(get_db)):
    """
    Add new user
    """
    user = helpers.get_user_by_email(db, user_data.email)
    if user:
        raise HTTPException(status_code=409, detail="Email already exists.")
    new_user = helpers.create_user(db, user_data)
    del new_user["password"]
    return create_response(data=new_user, message="User created successfully")


@router.post("/login/", response_model=schemas.Token)
def login(
    db: Session = Depends(get_db),
    form_data: schemas.OAuth2PasswordRequestFormEmail = Depends(),
):
    """generate access token for valid credentials"""
    user = helpers.authenticate_user(db, form_data.email, form_data.password)
    if not user:
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=60 * 24)
    access_token = helpers.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return create_response(
        data={"access_token": access_token, "token_type": "bearer"},
        message="User logged in successfully",
    )
