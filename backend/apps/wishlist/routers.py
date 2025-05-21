from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from conf.database import get_db
from apps.wishlist import models as wishlist_models
from apps.users.models import User
from apps.core.decorators import get_current_user

router = APIRouter()


@router.post("/")
async def create_wishlist(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Create a new wishlist item
    """
    db_wishlist = wishlist_models.Wishlist(
        user_id=current_user.id, course_id=course_id
    )
    db.add(db_wishlist)
    db.commit()
    db.refresh(db_wishlist)
    return db_wishlist


@router.get("/")
async def get_wishlist(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    """
    Get the wishlist of the current user
    """
    
    wishlist = (
        db.query(wishlist_models.Wishlist)
        .filter(wishlist_models.Wishlist.user_id == current_user.id)
        .all()
    )
    return wishlist
