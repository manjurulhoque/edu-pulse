from sqlalchemy import Boolean, Column, Integer, String, DateTime, func
from sqlalchemy.orm import relationship

from conf.database import Base
from apps.cart.models import Cart


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    name = Column(String)
    is_admin = Column(Boolean, default=False)
    avatar = Column(String, default="static/images/default-avatar.png")
    bio = Column(String, default="", nullable=True)
    website = Column(String, default="", nullable=True)
    is_instructor = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=func.now())

    courses = relationship("Course", back_populates="user")
    enrollments = relationship("Enrollment", back_populates="user")
    cart = relationship(Cart, back_populates="user", uselist=False, lazy="joined")
    checkouts = relationship("Checkout", back_populates="user")
    reviews = relationship("CourseReview", back_populates="user")

    def __repr__(self):
        return f"<User(email='{self.email}')>"
