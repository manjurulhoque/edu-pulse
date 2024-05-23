from sqlalchemy import Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import mapped_column, relationship
from conf.database import Base


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    short_description = Column(Text, nullable=True)
    level = Column(String(20), nullable=True)
    description = Column(Text, nullable=True)
    student_will_learn = Column(Text, nullable=True)
    requirements = Column(Text, nullable=True)
    user_id = mapped_column(ForeignKey("users.id"))
    # Define relationships
    user = relationship("User", back_populates="courses")
    lessons = relationship("Lesson", back_populates="course")
    enrollments = relationship("Enrollment", back_populates="course")
