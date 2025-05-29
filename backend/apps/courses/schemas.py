from typing import Optional
from pydantic import BaseModel, Field


class CourseSchema(BaseModel):
    title: str = Field(..., min_length=1)
    description: str | None
    short_description: str | None
    student_will_learn: str | None
    requirements: str | None
    level: str
    category_id: int
    actual_price: float
    discounted_price: float | None
    is_free: bool
    preview_image: Optional[str] = None

    class Config:
        # orm_mode = True
        from_attributes = True
