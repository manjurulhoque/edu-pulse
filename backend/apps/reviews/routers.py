from typing import List

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func

from apps.core.decorators import auth_required
from utils.params import common_parameters
from utils.response_utils import create_response
from apps.reviews import models as review_models
from apps.reviews.schemas import ReviewCreate, ReviewSchema
from conf.database import get_db
from apps.users.models import User
from apps.courses import models as course_models
from apps.enrollments import models as enrollment_models

router = APIRouter()


@router.get("/courses/{course_id}", response_model=List[ReviewSchema])
async def get_reviews_for_course(
    course_id: int,
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
    reviews = (
        db.query(review_models.CourseReview)
        .filter(review_models.CourseReview.course_id == course_id)
        .options(joinedload(review_models.CourseReview.user))
        .order_by(review_models.CourseReview.created_at.desc())
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
    # check if the course exists
    if (
        not db.query(course_models.Course)
        .filter(course_models.Course.id == course_id)
        .first()
    ):
        return create_response(
            data=None,
            message="Course not found",
            status_code=status.HTTP_404_NOT_FOUND,
        )
    # student must be enrolled in the course
    if (
        not db.query(enrollment_models.Enrollment)
        .filter(
            enrollment_models.Enrollment.course_id == course_id,
            enrollment_models.Enrollment.user_id == current_user.id,
        )
        .first()
    ):
        return create_response(
            data=None,
            message="You must be enrolled in the course to review it",
            status_code=status.HTTP_400_BAD_REQUEST,
        )
    # check if the user has already reviewed the course
    if (
        db.query(review_models.CourseReview)
        .filter(
            review_models.CourseReview.course_id == course_id,
            review_models.CourseReview.user_id == current_user.id,
        )
        .first()
    ):
        return create_response(
            data=None,
            message="You have already reviewed this course",
            status_code=status.HTTP_400_BAD_REQUEST,
        )
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


@router.get("/courses/{course_id}/my-review")
async def get_my_review_for_course(
    course_id: int,
    current_user: User = Depends(auth_required),
    db: Session = Depends(get_db),
):
    """
    Get the average rating for a course
    """
    review = (
        db.query(review_models.CourseReview)
        .filter(
            review_models.CourseReview.course_id == course_id,
            review_models.CourseReview.user_id == current_user.id,
        )
        .first()
    )
    return create_response(
        data=review,
        message="Review fetched successfully",
        status_code=status.HTTP_200_OK,
    )


@router.get("/courses/{course_id}/average-rating")
async def get_average_rating_for_course(
    course_id: int,
    db: Session = Depends(get_db),
):
    """
    Get the average rating for a course
    """
    average_rating = (
        db.query(func.avg(review_models.CourseReview.rating))
        .filter(review_models.CourseReview.course_id == course_id)
        .scalar()
    )
    return create_response(
        data=average_rating,
    )


@router.get("/courses/{course_id}/rating-distribution")
async def get_rating_distribution_for_course(
    course_id: int,
    db: Session = Depends(get_db),
):
    """
    Get the percentage distribution of ratings (1-5 stars) for a course
    """
    # Get total number of reviews for the course
    total_reviews = (
        db.query(func.count(review_models.CourseReview.id))
        .filter(review_models.CourseReview.course_id == course_id)
        .scalar()
    ) or 0

    # Get count for each rating
    rating_counts = (
        db.query(
            review_models.CourseReview.rating,
            func.count(review_models.CourseReview.id).label('count')
        )
        .filter(review_models.CourseReview.course_id == course_id)
        .group_by(review_models.CourseReview.rating)
        .all()
    )

    # Initialize distribution with 0% for all ratings
    distribution = {
        "1_star": 0,
        "2_star": 0,
        "3_star": 0,
        "4_star": 0,
        "5_star": 0
    }

    # Calculate percentages if there are reviews
    if total_reviews > 0:
        for rating, count in rating_counts:
            percentage = (count / total_reviews) * 100
            distribution[f"{int(rating)}_star"] = round(percentage, 2)

    return create_response(
        data={
            "distribution": distribution,
            "total_reviews": total_reviews
        }
    )
