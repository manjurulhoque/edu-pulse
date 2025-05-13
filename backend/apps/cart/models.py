from sqlalchemy import Column, Integer, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship
from conf.database import Base


class Cart(Base):
    __tablename__ = "carts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(
        Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, unique=True
    )
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    user = relationship("User", back_populates="cart", lazy="joined")
    items = relationship(
        "CartItem", back_populates="cart", cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Cart(id={self.id}, user_id={self.user_id})>"


class CartItem(Base):
    __tablename__ = "cart_items"

    id = Column(Integer, primary_key=True, index=True)
    cart_id = Column(
        Integer, ForeignKey("carts.id", ondelete="CASCADE"), nullable=False
    )
    course_id = Column(
        Integer, ForeignKey("courses.id", ondelete="CASCADE"), nullable=False
    )
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    cart = relationship("Cart", back_populates="items")
    course = relationship("Course")

    def __repr__(self):
        return f"<CartItem(id={self.id}, cart_id={self.cart_id}, course_id={self.course_id})>"
