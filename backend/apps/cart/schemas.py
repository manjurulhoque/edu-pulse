from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class CartItemBase(BaseModel):
    course_id: int


class CartItemCreate(CartItemBase):
    pass


class CartItemSchema(CartItemBase):
    id: int
    cart_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class CartBase(BaseModel):
    user_id: int


class CartCreate(CartBase):
    pass


class CartSchema(CartBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]
    items: List[CartItemSchema] = []

    class Config:
        from_attributes = True
