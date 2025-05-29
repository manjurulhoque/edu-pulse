from fastapi import APIRouter, Depends, status, Request
from datetime import datetime
from sqlalchemy.orm import Session

from conf.database import get_db
from apps.enrollments import models as enrollment_models
from apps.lessons import models as lesson_models
from apps.users.models import User
from apps.core.decorators import auth_required
from utils.response_utils import create_response

router = APIRouter()


@router.post("/mark-lesson-as-completed")
async def mark_lesson_as_completed(
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(auth_required),
):
    """
    Mark a lesson as completed
    """
    data = await request.json()
    lesson_id = data.get("lesson_id")
    if not lesson_id:
        return create_response(
            status_code=status.HTTP_400_BAD_REQUEST,
            message="Lesson ID is required",
        )
    lesson = (
        db.query(lesson_models.Lesson)
        .filter(lesson_models.Lesson.id == lesson_id)
        .first()
    )
    if not lesson:
        return create_response(
            status_code=status.HTTP_404_NOT_FOUND,
            message="Lesson not found",
        )
    enrollment = (
        db.query(enrollment_models.Enrollment)
        .filter(
            enrollment_models.Enrollment.user_id == current_user.id,
            enrollment_models.Enrollment.course_id == lesson.course_id,
        )
        .first()
    )
    if not enrollment:
        return create_response(
            status_code=status.HTTP_404_NOT_FOUND,
            message="Enrollment not found",
        )

    lesson_completion = enrollment_models.LessonCompletion(
        lesson_id=lesson_id,
        user_id=current_user.id,
        enrollment_id=enrollment.id,
        completed_at=datetime.now(),
        time_spent=0,
    )
    db.add(lesson_completion)
    db.commit()
    return create_response(data=lesson_completion, status_code=status.HTTP_201_CREATED)


@router.post("/mark-lesson-as-incomplete")
async def mark_lesson_as_incomplete(
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(auth_required),
):
    """
    Mark a lesson as incomplete
    """
    data = await request.json()
    lesson_id = data.get("lesson_id")
    if not lesson_id:
        return create_response(
            status_code=status.HTTP_400_BAD_REQUEST,
            message="Lesson ID is required",
        )
    lesson = (
        db.query(lesson_models.Lesson)
        .filter(lesson_models.Lesson.id == lesson_id)
        .first()
    )
    if not lesson:
        return create_response(
            status_code=status.HTTP_404_NOT_FOUND,
            message="Lesson not found",
        )
    enrollment = (
        db.query(enrollment_models.Enrollment)
        .filter(
            enrollment_models.Enrollment.user_id == current_user.id,
            enrollment_models.Enrollment.course_id == lesson.course_id,
        )
        .first()
    )
    if not enrollment:
        return create_response(
            status_code=status.HTTP_404_NOT_FOUND,
            message="Enrollment not found",
        )
    lesson_completion = (
        db.query(enrollment_models.LessonCompletion)
        .filter(
            enrollment_models.LessonCompletion.lesson_id == lesson_id,
            enrollment_models.LessonCompletion.user_id == current_user.id,
        )
        .first()
    )
    if not lesson_completion:
        return create_response(
            status_code=status.HTTP_404_NOT_FOUND,
            message="Lesson completion not found",
        )
    db.delete(lesson_completion)
    db.commit()
    return create_response(data=lesson, status_code=status.HTTP_200_OK)
