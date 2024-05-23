from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from conf.database import Base


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)
    description = Column(String)

    courses = relationship("Course", back_populates="category")
