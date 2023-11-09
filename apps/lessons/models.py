from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from conf.database import Base


class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(Text)
    course_id = Column(Integer, ForeignKey("courses.id"))
    # Define relationships
    course = relationship("Course", back_populates="lessons")
