from sqlalchemy import Column, ForeignKey, Integer, String, Text, Boolean
from sqlalchemy.orm import mapped_column, relationship

from apps.core.models import BaseModel


class Course(BaseModel):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    short_description = Column(Text, nullable=True)
    level = Column(String(20), nullable=True)
    description = Column(Text, nullable=True)
    student_will_learn = Column(Text, nullable=True)
    requirements = Column(Text, nullable=True)
    is_published = Column(Boolean, default=False)
    # user_id = mapped_column(ForeignKey("users.id"))
    # category_id = mapped_column(ForeignKey("categories.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    category_id = Column(Integer, ForeignKey("categories.id"))

    # Define relationships
    user = relationship("User", back_populates="courses")
    category = relationship("Category", back_populates="courses")
    lessons = relationship("Lesson", back_populates="course")
    enrollments = relationship("Enrollment", back_populates="course")
