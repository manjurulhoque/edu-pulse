import json
from typing import List, Optional

from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    HTTPException,
    UploadFile,
)
from pydantic import ValidationError
from sqlalchemy.orm import joinedload, Session
from starlette import status

from apps.core.decorators import auth_required
from apps.courses import helpers
from apps.courses.models import Course
from apps.courses.schemas import CourseCreate
from apps.users.helpers import get_current_user
from apps.users.models import User
from conf.database import get_db
from utils.params import common_parameters
from utils.response_utils import create_paginated_response, create_response
from utils.upload import save_image

router = APIRouter()


@router.get("/all-courses")
async def all_courses(
        db: Session = Depends(get_db), params: dict = Depends(common_parameters)
):
    query = db.query(Course).filter(Course.is_published == True)
    total = query.count()
    skip = (params["page"] - 1) * params["page_size"]
    courses = (
        query.options(joinedload(Course.user), joinedload(Course.category))
        .offset(skip)
        .limit(params["page_size"])
        .all()
    )
    for course in courses:
        try:
            if hasattr(course.user, "password"):
                del course.user.password
        except:
            pass

    return create_response(
        data=create_paginated_response(
            data=courses,
            total=total,
            page=params["page"],
            page_size=params["page_size"],
            path="/all-courses",
        )
    )


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
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid JSON format")
    except ValidationError as e:
        # If validation fails, return a 422 Unprocessable Entity with details
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(e))

    course_data_dict = course_data.model_dump()
    course_data_dict["preview_image"] = await save_image(preview_image)

    new_course = helpers.create_course(db, course_data_dict, current_user)
    return create_response(
        data=new_course,
        message="Course created successfully",
        status_code=status.HTTP_201_CREATED,
    )


@router.put("/update-course/{course_id}")
async def update_course(
        course_id: int,
        course_input: str = Form(...),
        preview_image: Optional[UploadFile] = File(None),
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user),
):
    """
    Update course
    """
    course = db.query(Course).filter(Course.id == course_id).first()
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
            message="You are not allowed to update this course",
        )

    try:
        course_data_dict = json.loads(course_input)
        course_data = CourseCreate(**course_data_dict)
    except json.JSONDecodeError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid JSON format")
    except ValidationError as e:
        # If validation fails, return a 422 Unprocessable Entity with details
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(e))

    course_data_dict = course_data.model_dump()
    if preview_image:
        course_data_dict["preview_image"] = await save_image(preview_image)

    for key, value in course_data_dict.items():
        setattr(course, key, value)

    db.add(course)
    db.commit()
    db.refresh(course)

    return create_response(
        data=course,
        message="Course updated successfully",
        status_code=status.HTTP_200_OK,
    )


@router.get("/my-created-courses")
def my_created_courses(
        db: Session = Depends(get_db),
        current_user: User = Depends(auth_required),
):
    courses = db.query(Course).filter(Course.user_id == current_user.id).all()
    return create_response(data=courses)


@router.post("/publish-course")
async def publish_course(
        course_id: int = Form(...),
        db: Session = Depends(get_db),
        current_user: User = Depends(auth_required),
):
    course = (
        db.query(Course)
        .filter(Course.id == course_id, Course.user_id == current_user.id)
        .first()
    )
    if not course:
        return create_response(
            data=None,
            status_code=status.HTTP_404_NOT_FOUND,
            message="Course not found",
        )
    if course.is_published:
        return create_response(
            data=None,
            status_code=status.HTTP_304_NOT_MODIFIED,
            message="Course was already published",
        )
    course.is_published = True
    db.add(course)
    db.commit()
    db.refresh(course)
    return create_response(
        data=course, message="Course published successfully"
    )


@router.get("/course/{slug}")
async def single_course(slug: str, db: Session = Depends(get_db)):
    course = (
        db.query(Course)
        .options(joinedload(Course.user), joinedload(Course.category))
        .filter(Course.is_published == True, Course.slug == slug)
        .first()
    )
    try:
        if hasattr(course.user, "password"):
            del course.user.password
    except:
        pass

    return create_response(data=course)


@router.get("/course/{slug}/sections")
async def course_sections(slug: str, db: Session = Depends(get_db), current_user: User = Depends(auth_required)):
    course = (
        db.query(Course)
        .options(joinedload(Course.sections))
        .filter(Course.slug == slug)
        .first()
    )
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
    return create_response(data=course.sections)
