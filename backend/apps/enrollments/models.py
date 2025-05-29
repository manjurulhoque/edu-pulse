from sqlalchemy import Column, Integer, ForeignKey, Boolean, DateTime, func
from sqlalchemy.orm import relationship
from conf.database import Base


class Enrollment(Base):
    __tablename__ = "enrollments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    course_id = Column(Integer, ForeignKey("courses.id"))
    completed = Column(Boolean, default=False)
    certificate_issued = Column(Boolean, default=False)
    enrolled_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime)
    certificate_issued_at = Column(DateTime)

    # Define relationships
    user = relationship("User", back_populates="enrollments")
    course = relationship("Course", back_populates="enrollments")
    lesson_completions = relationship("LessonCompletion", back_populates="enrollment")

    def __repr__(self):
        return f"<Enrollment(id={self.id}, user_id={self.user_id}, course_id={self.course_id})>"


class LessonCompletion(Base):
    __tablename__ = "lesson_completions"

    id = Column(Integer, primary_key=True, index=True)
    enrollment_id = Column(Integer, ForeignKey("enrollments.id"))
    lesson_id = Column(Integer, ForeignKey("lessons.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    is_completed = Column(Boolean, default=False)
    completed_at = Column(DateTime)
    time_spent = Column(Integer)

    # Define relationships
    enrollment = relationship("Enrollment", back_populates="lesson_completions")
    lesson = relationship("Lesson")

    def __repr__(self):
        return f"<LessonCompletion(id={self.id}, enrollment_id={self.enrollment_id}, lesson_id={self.lesson_id}, user_id={self.user_id})>"
