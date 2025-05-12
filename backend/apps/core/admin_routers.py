from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload
from starlette import status

from conf.database import get_db
from apps.users.models import User
from apps.core.decorators import admin_required
from utils.response_utils import create_response, create_paginated_response
from apps.courses import models as course_models
from utils.params import common_parameters
from apps.core.schemas import UserUpdate

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


@admin_router.get("/users")
async def get_all_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
    params: dict = Depends(common_parameters),
):
    query = db.query(User)
    total = query.count()
    page = params.get("page", 1)
    page_size = params.get("page_size", 10)
    skip = (page - 1) * page_size
    users = query.offset(skip).limit(params["page_size"]).all()

    # Remove sensitive information
    for user in users:
        if hasattr(user, "password"):
            del user.password

    return create_paginated_response(
        data=users,
        total=total,
        page=params["page"],
        page_size=params["page_size"],
        path="/admin/users",
    )


@admin_router.put("/users/{user_id}")
async def update_user(
    user_id: int,
    user_data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return create_response(
            status_code=status.HTTP_404_NOT_FOUND,
            message="User not found",
        )

    # Update user fields if provided
    update_data = user_data.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(user, field, value)

    try:
        db.commit()
        db.refresh(user)
        if hasattr(user, "password"):
            del user.password
        return create_response(
            status_code=status.HTTP_200_OK,
            message="User updated successfully",
            data=user,
        )
    except Exception as e:
        db.rollback()
        return create_response(
            status_code=status.HTTP_400_BAD_REQUEST,
            message=f"Failed to update user: {str(e)}",
        )


@admin_router.delete("/users/{user_id}")
async def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return create_response(
            status_code=status.HTTP_404_NOT_FOUND,
            message="User not found",
        )

    # Prevent self-deletion
    if user.id == current_user.id:
        return create_response(
            status_code=status.HTTP_400_BAD_REQUEST,
            message="Cannot delete your own account",
        )

    try:
        db.delete(user)
        db.commit()
        return create_response(
            status_code=status.HTTP_200_OK,
            message="User deleted successfully",
        )
    except Exception as e:
        db.rollback()
        return create_response(
            status_code=status.HTTP_400_BAD_REQUEST,
            message=f"Failed to delete user: {str(e)}",
        )
