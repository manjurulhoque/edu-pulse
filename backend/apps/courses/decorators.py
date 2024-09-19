from functools import wraps

from fastapi import Depends
from sqlalchemy.orm import Session
from starlette import status

from apps.courses.models import Course
from apps.users.helpers import get_current_user
from conf.database import get_db
from utils.response_utils import create_response


def course_owner_required(func):
    @wraps(func)
    async def wrapper(slug: str, db: Session = Depends(get_db), current_user=Depends(get_current_user), *args,
                      **kwargs):
        course = db.query(Course).filter(Course.slug == slug).first()
        if not course:
            return create_response(
                data=None,
                status_code=status.HTTP_404_NOT_FOUND,
                message="Course not found",
            )
        if course.user_id != current_user.id:
            return create_response(
                data=None,
                status_code=status.HTTP_403_FORBIDDEN,
                message="You are not allowed to access this course sections",
            )
        return await func(course, db, current_user, *args, **kwargs)

    return wrapper
