from pydantic import BaseModel, EmailStr, Field


class CourseSchema(BaseModel):
    title: str
    description: str

    class Config:
        # orm_mode = True
        from_attributes = True
