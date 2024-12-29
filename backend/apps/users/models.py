from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relationship

from conf.database import Base


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

    courses = relationship("Course", back_populates="user")
    enrollments = relationship("Enrollment", back_populates="user")

    def __repr__(self):
        return f"<User(email='{self.email}')>"
