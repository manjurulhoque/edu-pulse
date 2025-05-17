from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ReviewBase(BaseModel):
    rating: float
    comment: Optional[str] = None


class ReviewCreate(ReviewBase):
    pass


class ReviewSchema(ReviewBase):
    id: int
    user_id: int
    course_id: int
    created_at: datetime
    updated_at: datetime
