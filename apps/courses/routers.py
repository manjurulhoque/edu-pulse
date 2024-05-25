import json

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from pydantic import ValidationError
from sqlalchemy.orm import Session
from starlette import status

from apps.courses import helpers
from apps.courses.models import Course
from apps.courses.schemas import CourseCreate
from apps.users.helpers import get_current_user
from apps.users.models import User
from conf.database import get_db
from utils.response_utils import create_response
from utils.upload import save_image

router = APIRouter()


@router.post("/create-course")
async def create_course(
    course_input: str = Form(...),
    preview_image: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Create new course
    """
    try:
        course_data_dict = json.loads(course_input)
        course_data = CourseCreate(**course_data_dict)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON format")
    except ValidationError as e:
        # If validation fails, return a 422 Unprocessable Entity with details
        raise HTTPException(status_code=422, detail=str(e))

    course_data_dict = course_data.model_dump()
    course_data_dict["preview_image"] = await save_image(preview_image)

    new_course = helpers.create_course(db, course_data_dict, current_user)
    return create_response(
        data=new_course,
        message="Course created successfully",
        status_code=status.HTTP_201_CREATED,
    )


@router.get("/my-created-courses")
def my_created_courses(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    courses = db.query(Course).all()
    return create_response(data=courses)
