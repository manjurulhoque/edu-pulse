from fastapi import APIRouter, Depends, status, Request
from sqlalchemy.orm import Session, joinedload

from conf.database import get_db
from apps.wishlist import models as wishlist_models
from apps.courses import models as course_models
from apps.users.models import User
from apps.core.decorators import get_current_user
from utils.response_utils import create_response

router = APIRouter()


@router.post("")
async def create_wishlist(
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Create a new wishlist item
    """
    data = await request.json()
    course_id = data.get("course_id")
    db_wishlist = wishlist_models.Wishlist(user_id=current_user.id, course_id=course_id)
    db.add(db_wishlist)
    db.commit()
    db.refresh(db_wishlist)
    return create_response(data=db_wishlist)


@router.get("")
async def get_wishlist(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    """
    Get the wishlist of the current user
    """

    wishlist = (
        db.query(wishlist_models.Wishlist)
        .filter(wishlist_models.Wishlist.user_id == current_user.id)
        .options(
            joinedload(wishlist_models.Wishlist.course).joinedload(
                course_models.Course.category
            ),
            joinedload(wishlist_models.Wishlist.course).joinedload(
                course_models.Course.user
            ),
        )
        .all()
    )
    for item in wishlist:
        try:
            if (
                item.course
                and hasattr(item.course.user, "password")
                and item.course.user.password
            ):
                delattr(item.course.user, "password")
        except:
            pass

    return create_response(data=wishlist)


@router.delete("/{course_id}")
async def delete_wishlist(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Delete a wishlist item
    """
    db_wishlist = (
        db.query(wishlist_models.Wishlist)
        .filter(
            wishlist_models.Wishlist.user_id == current_user.id,
            wishlist_models.Wishlist.course_id == course_id,
        )
        .first()
    )
    if not db_wishlist:
        return create_response(
            data=None,
            status_code=status.HTTP_404_NOT_FOUND,
            message="Wishlist item not found",
        )
    db.delete(db_wishlist)
    db.commit()
    return create_response(data=None, status_code=status.HTTP_200_OK)


@router.get("/already-in-wishlist/{course_id}")
async def already_in_wishlist(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Check if a course is already in the wishlist
    """
    db_wishlist = (
        db.query(wishlist_models.Wishlist)
        .filter(
            wishlist_models.Wishlist.user_id == current_user.id,
            wishlist_models.Wishlist.course_id == course_id,
        )
        .first()
    )
    return create_response(data=True if db_wishlist else False)
