from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette import status

from apps.courses import schemas, helpers
from apps.users.helpers import get_current_user
from apps.users.models import User

from conf.database import get_db
from utils.response_utils import create_response

router = APIRouter()


@router.post("/create-course", response_model=schemas.CourseSchema)
def create_course(
    course_data: schemas.CourseSchema,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Create new course
    """
    print(course_data)
    new_course = helpers.create_course(db, course_data, current_user)
    return create_response(
        data=new_course,
        message="Course created successfully",
        status_code=status.HTTP_201_CREATED,
    )
