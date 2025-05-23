from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from conf.database import get_db
from apps.lessons.models import Lesson
from apps.users.models import User
from apps.core.decorators import auth_required
from utils.response_utils import create_response

router = APIRouter()


@router.get("/{lesson_id}")
async def get_lesson(
    lesson_id: int,
    current_user: User = Depends(auth_required),
    db: Session = Depends(get_db),
):
    """
    Get a lesson by its ID

    Args:
        lesson_id: The ID of the lesson

    Returns:
        The lesson
    """
    lesson = (
        db.query(Lesson)
        .filter(Lesson.id == lesson_id, Lesson.is_published == True)
        .first()
    )
    if not lesson:
        return create_response(
            data=None,
            status_code=status.HTTP_404_NOT_FOUND,
            message="Lesson not found",
        )
    return create_response(data=lesson)


@router.get("/last-accessed/{course_id}")
async def get_last_accessed_lesson(
    course_id: int,
    current_user: User = Depends(auth_required),
    db: Session = Depends(get_db),
):
    """
    Get the last accessed lesson for a course

    Args:
        course_id: The ID of the course

    Returns:
        The last accessed lesson for the course
    """
    # for now, return the first lesson
    lesson = (
        db.query(Lesson)
        .filter(Lesson.course_id == course_id, Lesson.is_published == True)
        .first()
    )
    return create_response(data=lesson)
