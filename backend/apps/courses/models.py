from slugify import slugify
from sqlalchemy import (
    Column,
    ForeignKey,
    Integer,
    String,
    Text,
    Boolean,
    Float,
    event,
)
from sqlalchemy.orm import mapped_column, relationship

from apps.core.models import BaseModel


class Course(BaseModel):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(30), nullable=False)
    title = Column(String, index=True)
    short_description = Column(Text, nullable=True)
    level = Column(String(20), nullable=True)
    description = Column(Text, nullable=True)
    student_will_learn = Column(Text, nullable=True)
    requirements = Column(Text, nullable=True)
    is_published = Column(Boolean, default=False)
    preview_image = Column(String, nullable=False)
    actual_price = Column(Float, nullable=False, default=0.0)
    discounted_price = Column(Float, nullable=True, default=0.0)
    is_free = Column(Boolean, default=False)
    is_featured = Column(Boolean, default=False)
    is_popular = Column(Boolean, default=False)
    is_approved = Column(Boolean, default=False)
    # user_id = mapped_column(ForeignKey("users.id"))
    # category_id = mapped_column(ForeignKey("categories.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    category_id = Column(Integer, ForeignKey("categories.id"))

    # Define relationships
    user = relationship("User", back_populates="courses")  # author
    category = relationship("Category", back_populates="courses")
    lessons = relationship("Lesson", back_populates="course")
    enrollments = relationship("Enrollment", back_populates="course")
    sections = relationship("CourseSection", back_populates="course")

    def __repr__(self):
        return f"<Course(id={self.id}, title='{self.title}', user_id={self.user_id})>"


@event.listens_for(Course, "before_insert")
def receive_before_insert(mapper, connection, target):
    target.slug = slugify(target.title, max_length=30)


class CourseSection(BaseModel):
    __tablename__ = "course_sections"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True)

    course_id = Column(Integer, ForeignKey("courses.id"))
    course = relationship("Course", back_populates="sections")
    lessons = relationship("Lesson", back_populates="section")

    def __repr__(self):
        return f"<CourseSection(id={self.id}, title='{self.title}', course_id={self.course_id})>"
