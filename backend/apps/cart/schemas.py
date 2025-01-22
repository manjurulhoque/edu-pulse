from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class CartItemBase(BaseModel):
    course_id: int


class CartItemCreate(CartItemBase):
    pass


class CartItem(CartItemBase):
    id: int
    cart_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class CartBase(BaseModel):
    user_id: int


class CartCreate(CartBase):
    pass


class Cart(CartBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]
    items: List[CartItem] = []

    class Config:
        from_attributes = True
