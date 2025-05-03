from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from apps.core.decorators import auth_required
from apps.users.models import User
from conf.database import get_db
from utils.response_utils import create_response

from . import schemas, services


router = APIRouter()


@router.get("/cart")
async def get_cart(
    current_user: User = Depends(auth_required), db: Session = Depends(get_db)
):
    """Get user's cart"""
    cart = services.get_cart(db, current_user.id)
    return create_response(
        data=schemas.CartSchema.model_validate(cart).model_dump(),
        message="Cart retrieved successfully",
    )


@router.post("/cart/add/{course_id}")
async def add_to_cart(
    course_id: int,
    current_user: User = Depends(auth_required),
    db: Session = Depends(get_db),
):
    """Add course to cart"""
    cart_item = services.add_to_cart(db, current_user.id, course_id)
    return create_response(
        data=schemas.CartItemSchema.model_validate(cart_item).model_dump(),
        message="Course added to cart successfully",
    )


@router.delete("/cart/remove/{course_id}")
async def remove_from_cart(
    course_id: int,
    current_user: User = Depends(auth_required),
    db: Session = Depends(get_db),
):
    """Remove course from cart"""
    result = services.remove_from_cart(db, current_user.id, course_id)
    return create_response(message=result["message"])


@router.delete("/cart/clear")
async def clear_cart(
    current_user: User = Depends(auth_required), db: Session = Depends(get_db)
):
    """Clear all items from cart"""
    result = services.clear_cart(db, current_user.id)
    return create_response(message=result["message"])
