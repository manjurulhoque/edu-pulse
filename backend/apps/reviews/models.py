from sqlalchemy import (
    Column,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    UniqueConstraint,
    func,
)
from sqlalchemy.orm import relationship

from conf.database import Base


class CourseReview(Base):
    __tablename__ = "course_reviews"
    __table_args__ = (UniqueConstraint("user_id", "course_id", name="uix_user_course"),)

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)
    course_id = Column(Integer, ForeignKey("courses.id"), index=True)
    rating = Column(Float, nullable=False, default=0.0, index=True)
    comment = Column(String, nullable=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="reviews")
    course = relationship("Course", back_populates="reviews")

    def __repr__(self):
        return f"<CourseReview(id={self.id}, user_id={self.user_id}, course_id={self.course_id}, rating={self.rating}, comment={self.comment})>"
