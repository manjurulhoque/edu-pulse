from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class UserBase(BaseModel):
    email: EmailStr = Field(None, example="user@example.com", title="User email")


class UserReturn(UserBase):
    name: str
    id: int
    username: str


class UserCreate(UserBase):
    name: str
    username: str
    password: str = Field(..., hidden=True)

    class Config:
        # orm_mode = True
        from_attributes = True


class UserLogin(UserBase):
    password: str = Field(..., hidden=True)

    class Config:
        # orm_mode = True
        from_attributes = True


class RefreshTokenRequest(BaseModel):
    refresh_token: str


class Token(BaseModel):
    access_token: str
    token_type: str


class OAuth2PasswordRequestFormEmail(BaseModel):
    email: EmailStr
    password: str


class UserUpdate(UserBase):
    name: str
    bio: Optional[str] = None
    website: Optional[str] = None
    avatar: Optional[str] = None


class UserUpdateResponse(UserReturn):
    name: str
    bio: Optional[str] = None
    website: Optional[str] = None
    avatar: Optional[str] = None


class UserInfo(UserReturn):
    bio: Optional[str] = None
    website: Optional[str] = None
    avatar: Optional[str] = None
