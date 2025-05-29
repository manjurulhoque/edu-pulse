from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from conf.database import get_db
from apps.lessons.models import Lesson
from apps.enrollments.models import LessonCompletion
from apps.courses.models import Course, CourseStatus
from apps.users.models import User
from apps.core.decorators import auth_required
from utils.response_utils import create_response

router = APIRouter()


@router.get("/course/{slug}")
async def get_course_lessons(
    slug: str,
    current_user: User = Depends(auth_required),
    db: Session = Depends(get_db),
):
    """
    Get all lessons for a course

    Args:
        course_id: The ID of the course

    Returns:
        The lessons for the course
    """
    course = (
        db.query(Course)
        .filter(Course.slug == slug, Course.status == CourseStatus.PUBLISHED)
        .first()
    )
    if not course:
        return create_response(
            data=None,
            status_code=status.HTTP_404_NOT_FOUND,
            message="Course not found",
        )
    course_id = course.id
    lessons = (
        db.query(Lesson)
        .filter(Lesson.course_id == course_id, Lesson.is_published == True)
        .all()
    )
    for lesson in lessons:
        lesson.lesson_completion = (
            db.query(LessonCompletion)
            .filter(
                LessonCompletion.lesson_id == lesson.id,
                LessonCompletion.user_id == current_user.id,
            )
            .first()
        )
    return create_response(data=lessons)


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


@router.get("/last-accessed/{slug}")
async def get_last_accessed_lesson(
    slug: str,
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
    course = (
        db.query(Course)
        .filter(Course.slug == slug, Course.status == CourseStatus.PUBLISHED)
        .first()
    )
    if not course:
        return create_response(
            data=None,
            status_code=status.HTTP_404_NOT_FOUND,
            message="Course not found",
        )
    # for now, return the first lesson
    lesson = (
        db.query(Lesson)
        .filter(Lesson.course_id == course.id, Lesson.is_published == True)
        .first()
    )
    return create_response(data=lesson)
