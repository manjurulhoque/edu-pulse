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
