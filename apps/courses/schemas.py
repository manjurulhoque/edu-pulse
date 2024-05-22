from pydantic import BaseModel, EmailStr, Field


class CourseSchema(BaseModel):
    title: str
    description: str | None
    short_description: str | None
    student_will_learn: str | None
    requirements: str | None

    class Config:
        # orm_mode = True
        from_attributes = True
