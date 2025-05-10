from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload
from conf.database import get_db
from apps.users.models import User
from apps.core.decorators import admin_required
from utils.response_utils import create_response, create_paginated_response
from starlette import status
from apps.courses import models as course_models
from utils.params import common_parameters

admin_router = APIRouter(prefix="/admin", tags=["admin"])


@admin_router.get("/courses")
async def get_all_courses(
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
    params: dict = Depends(common_parameters),
):
    query = db.query(course_models.Course)
    total = query.count()
    page = params.get("page", 1)
    page_size = params.get("page_size", 10)
    skip = (page - 1) * page_size
    courses = (
        query.options(
            joinedload(course_models.Course.user),
            joinedload(course_models.Course.category),
        )
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
    return create_paginated_response(
        data=courses,
        total=total,
        page=params["page"],
        page_size=params["page_size"],
        path="/admin/courses",
    )
