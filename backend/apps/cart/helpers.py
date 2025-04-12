from sqlalchemy.orm import Session, joinedload
from . import models, schemas
from fastapi import HTTPException
from apps.courses.models import Course


def get_cart(db: Session, user_id: int):
    cart = (
        db.query(models.Cart)
        .filter(models.Cart.user_id == user_id)
        .options(joinedload(models.Cart.items))
        .first()
    )
    if not cart:
        cart = models.Cart(user_id=user_id)
        db.add(cart)
        db.commit()
        db.refresh(cart)
    return cart


def add_to_cart(db: Session, user_id: int, course_id: int):
    cart = get_cart(db, user_id)

    # Check if course exists
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    # Check if item already in cart
    existing_item = (
        db.query(models.CartItem)
        .filter(
            models.CartItem.cart_id == cart.id, models.CartItem.course_id == course_id
        )
        .first()
    )

    if existing_item:
        raise HTTPException(status_code=400, detail="Course already in cart")

    cart_item = models.CartItem(cart_id=cart.id, course_id=course_id)
    db.add(cart_item)
    db.commit()
    db.refresh(cart_item)
    return cart_item


def remove_from_cart(db: Session, user_id: int, course_id: int):
    cart = get_cart(db, user_id)

    cart_item = (
        db.query(models.CartItem)
        .filter(
            models.CartItem.cart_id == cart.id, models.CartItem.course_id == course_id
        )
        .first()
    )

    if not cart_item:
        raise HTTPException(status_code=404, detail="Course not found in cart")

    db.delete(cart_item)
    db.commit()
    return {"message": "Item removed from cart"}


def clear_cart(db: Session, user_id: int):
    cart = get_cart(db, user_id)
    db.query(models.CartItem).filter(models.CartItem.cart_id == cart.id).delete()
    db.commit()
    return {"message": "Cart cleared"}
