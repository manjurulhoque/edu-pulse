from typing import List

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from apps.core.decorators import auth_required
from utils.params import common_parameters
from utils.response_utils import create_response
from apps.reviews import models as review_models
from apps.reviews.schemas import ReviewCreate, ReviewSchema
from conf.database import get_db
from apps.users.models import User

router = APIRouter(prefix="/reviews", tags=["reviews"])


@router.get("/courses/{course_id}", response_model=List[ReviewSchema])
async def get_reviews_for_course(
    course_id: int,
    current_user: User = Depends(auth_required),
    params: dict = Depends(common_parameters),
    db: Session = Depends(get_db),
):
    """
    Get reviews for a course

    Args:
        course_id: The ID of the course to get reviews for
        params: The parameters for the request

    Returns:
        A list of reviews for the course
    """
    page = params.get("page", 1)
    page_size = params.get("page_size", 10)
    reviews = (
        db.query(review_models.CourseReview)
        .filter(review_models.CourseReview.course_id == course_id)
        .order_by(review_models.CourseReview.created_at.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
        .all()
    )
    return create_response(
        data=reviews,
        message="Reviews fetched successfully",
        status_code=status.HTTP_200_OK,
    )


@router.post("/courses/{course_id}")
async def create_review_for_course(
    course_id: int,
    review: ReviewCreate,
    current_user: User = Depends(auth_required),
    db: Session = Depends(get_db),
):
    """
    Create a review for a course

    Args:
        course_id: The ID of the course to create a review for
        review: The review to create

    Returns:
        A message indicating that the review was created successfully
    """
    review = review_models.CourseReview(
        course_id=course_id,
        user_id=current_user.id,
        rating=review.rating,
        comment=review.comment,
    )
    db.add(review)
    db.commit()
    db.refresh(review)
    return create_response(
        data=review,
        message="Review created successfully",
        status_code=status.HTTP_201_CREATED,
    )
