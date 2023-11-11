from typing import List, ForwardRef

from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    email: EmailStr = Field(None, example="user@example.com", title="User email")


class UserCreate(UserBase):
    name: str
    password: str

    class Config:
        # orm_mode = True
        from_attributes = True
