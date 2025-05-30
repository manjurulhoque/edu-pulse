from typing import Optional
from pydantic import BaseModel, Field, validator


class CourseSchema(BaseModel):
    title: str = Field(..., min_length=1)
    description: str | None
    short_description: str | None
    student_will_learn: str | None
    requirements: str | None
    level: str
    category_id: int
    actual_price: float
    discounted_price: Optional[float] = None
    is_free: bool
    preview_image: Optional[str] = None

    @validator('discounted_price', pre=True)
    def validate_discounted_price(cls, v):
        if v == '' or v is None:
            return None
        return float(v)

    class Config:
        # orm_mode = True
        from_attributes = True
