from sqlalchemy import Boolean, Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from conf.database import Base


class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    url = Column(Text, nullable=True) # Youtube URL for now
    content = Column(Text, nullable=True)
    # is_completed = Column(Boolean, default=False)
    is_free = Column(Boolean, default=False)
    is_published = Column(Boolean, default=False)
    course_id = Column(Integer, ForeignKey("courses.id"))
    section_id = Column(Integer, ForeignKey("course_sections.id", ondelete="CASCADE"))

    # Define relationships
    course = relationship("Course", back_populates="lessons")
    section = relationship("CourseSection", back_populates="lessons")

    def __repr__(self):
        return f"<Lesson(id={self.id}, title='{self.title}', course_id={self.course_id}, section_id={self.section_id})>"
