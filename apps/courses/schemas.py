from pydantic import BaseModel, Field


class CourseSchema(BaseModel):
    title: str = Field(..., min_length=1)
    description: str | None
    short_description: str | None
    student_will_learn: str | None
    requirements: str | None
    level: str
    category_id: int

    class Config:
        # orm_mode = True
        from_attributes = True
