from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone

from conf.database import Base


class Checkout(Base):
    __tablename__ = "checkouts"

    id = Column(Integer, primary_key=True)
    full_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    address = Column(String, nullable=False)
    city = Column(String, nullable=False)
    country = Column(String, nullable=False)
    zip_code = Column(String, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="checkouts")
    items = relationship("CheckoutItem", back_populates="checkout")

    def __repr__(self):
        return f"<Checkout(id={self.id}, full_name='{self.full_name}', email='{self.email}', address='{self.address}', city='{self.city}', country='{self.country}', zip_code='{self.zip_code}')>"


class CheckoutItem(Base):
    __tablename__ = "checkout_items"

    id = Column(Integer, primary_key=True)
    checkout_id = Column(Integer, ForeignKey("checkouts.id"))
    course_id = Column(Integer, ForeignKey("courses.id"))

    checkout = relationship("Checkout", back_populates="items")
    course = relationship("Course")

    def __repr__(self):
        return f"<CheckoutItem(id={self.id}, checkout_id={self.checkout_id}, course_id={self.course_id})>"
