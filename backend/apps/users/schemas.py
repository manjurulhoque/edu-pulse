from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    email: EmailStr = Field(
        None, example="user@example.com", title="User email"
    )


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
