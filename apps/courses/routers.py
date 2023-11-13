from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from apps.courses import schemas, helpers
from conf.database import get_db
from utils.response_utils import create_response

router = APIRouter()


@router.post("/create-course", response_model=schemas.CourseSchema)
def create_course(course_data: schemas.CourseSchema, db: Session = Depends(get_db)):
    """
    Create new course
    """

    new_course = helpers.create_course(db, course_data)
    return create_response(data=new_course, message="Course created successfully")
