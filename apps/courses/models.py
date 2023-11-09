from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship
from conf.database import Base


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    # Define relationships
    lessons = relationship("Lesson", back_populates="course")
    enrollments = relationship("Enrollment", back_populates="course")
