from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status

from apps.checkout.models import Checkout, CheckoutItem
from apps.users.models import User
from conf.database import get_db
from apps.users.services import get_current_user
from apps.checkout.schemas import CheckoutInput
from apps.cart.services import get_cart, clear_cart
from utils.response_utils import create_response
from apps.enrollments.services import get_enrollment, add_course_to_enrollment

router = APIRouter(prefix="/checkout", tags=["checkout"])


@router.post("/")
async def create_checkout(
    checkout_input: CheckoutInput,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if not current_user:
        return create_response(
            data=None,
            message="Unauthorized",
            status_code=status.HTTP_401_UNAUTHORIZED,
        )

    # get cart items
    cart = get_cart(db, current_user.id)
    if not cart:
        return create_response(
            data=None,
            message="No items found in cart",
            status_code=status.HTTP_404_NOT_FOUND,
        )

    # create checkout
    checkout_data = {
        "full_name": checkout_input.full_name,
        "email": current_user.email,
        "address": checkout_input.address,
        "city": checkout_input.city,
        "country": checkout_input.country,
        "zip_code": checkout_input.zip_code,
        "user_id": current_user.id,
    }
    db_checkout = Checkout(**checkout_data)
    db.add(db_checkout)
    db.commit()
    db.refresh(db_checkout)

    # create checkout items
    for item in cart.items:
        checkout_item_data = {
            "checkout_id": db_checkout.id,
            "course_id": item.course_id,
        }
        db_checkout_item = CheckoutItem(**checkout_item_data)
        db.add(db_checkout_item)
        course_id = item.course_id
        enrollment = get_enrollment(db, current_user.id, course_id)
        if not enrollment:
            add_course_to_enrollment(db, current_user.id, course_id)
    db.commit()
    db.refresh(db_checkout)

    # clear cart
    clear_cart(db, current_user.id)

    return create_response(
        data=None,
        message="Checkout created successfully",
    )
