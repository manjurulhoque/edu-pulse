from datetime import datetime, timedelta

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload
from starlette import status

from conf.database import get_db
from apps.users.models import User
from apps.core.decorators import admin_required
from utils.response_utils import create_response, create_paginated_response
from apps.courses import models as course_models
from utils.params import common_parameters, admin_common_parameters
from apps.core.schemas import UserUpdate
from apps.categories import models as category_models
from apps.checkout.models import Checkout, CheckoutItem

admin_router = APIRouter(prefix="/admin", tags=["admin"])


@admin_router.get("/courses")
async def get_all_courses(
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
    params: dict = Depends(admin_common_parameters),
):
    query = db.query(course_models.Course)
    page = params.get("page", 1)
    page_size = params.get("page_size", 10)
    skip = (page - 1) * page_size
    sort_by = params.get("sort_by", "recent")
    category = params.get("category", None)
    instructor = params.get("instructor", None)
    status = params.get("status", None)
    price = params.get("price", None)
    date = params.get("date", None)
    search = params.get("search", None)
    is_approved = params.get("is_approved", None)

    # Apply filters if provided
    if isinstance(is_approved, bool):
        query = query.filter(course_models.Course.is_approved == is_approved)
    if category:
        query = query.filter(course_models.Course.category_id == category)
    if instructor:
        query = query.filter(course_models.Course.user_id == instructor)
    if status:
        query = query.filter(course_models.Course.status == status)
    if search:
        query = query.filter(course_models.Course.title.ilike(f"%{search}%"))
    if price:
        if price == "free":
            query = query.filter(course_models.Course.is_free == True)
        elif price == "paid":
            query = query.filter(course_models.Course.is_free == False)
        elif price == "low":
            query = query.filter(course_models.Course.actual_price < 20)
        elif price == "medium":
            query = query.filter(
                course_models.Course.actual_price >= 20,
                course_models.Course.actual_price <= 50,
            )
        elif price == "high":
            query = query.filter(course_models.Course.actual_price > 50)
    if date:
        if date == "today":
            query = query.filter(
                course_models.Course.created_at >= datetime.now().date()
            )
        elif date == "week":
            query = query.filter(
                course_models.Course.created_at
                >= datetime.now().date() - timedelta(days=7)
            )
        elif date == "month":
            query = query.filter(
                course_models.Course.created_at
                >= datetime.now().date() - timedelta(days=30)
            )
        elif date == "quarter":
            query = query.filter(
                course_models.Course.created_at
                >= datetime.now().date() - timedelta(days=90)
            )
        elif date == "year":
            query = query.filter(
                course_models.Course.created_at
                >= datetime.now().date() - timedelta(days=365)
            )

    # Apply ordering before limit and offset
    if sort_by == "recent":
        query = query.order_by(course_models.Course.created_at.desc())
    elif sort_by == "title":
        query = query.order_by(course_models.Course.title.asc())
    elif sort_by == "title_desc":
        query = query.order_by(course_models.Course.title.desc())
    # elif sort_by == "enrollments":
    #     query = query.order_by(course_models.Course.enrollments_count.desc())
    # elif sort_by == "rating":
    #     query = query.order_by(course_models.Course.average_rating.desc())

    total = query.count()
    # Apply joins, limit and offset after ordering
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


@admin_router.put("/courses/{course_id}/approve")
async def approve_course(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):
    course = (
        db.query(course_models.Course)
        .filter(course_models.Course.id == course_id)
        .first()
    )
    if not course:
        return create_response(
            status_code=status.HTTP_404_NOT_FOUND,
            message="Course not found",
        )
    if course.is_approved:
        return create_response(
            status_code=status.HTTP_400_BAD_REQUEST,
            message="Course already approved",
        )
    course.is_approved = True
    db.commit()
    db.refresh(course)
    return create_response(
        status_code=status.HTTP_200_OK,
        message="Course approved successfully",
        data=course,
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


@admin_router.get("/categories")
async def get_all_categories(
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
    params: dict = Depends(common_parameters),
):
    query = db.query(category_models.Category)
    total = query.count()
    page = params.get("page", 1)
    page_size = params.get("page_size", 10)
    skip = (page - 1) * page_size
    categories = query.offset(skip).limit(params["page_size"]).all()

    return create_paginated_response(
        data=categories,
        total=total,
        page=params["page"],
        page_size=params["page_size"],
        path="/admin/categories",
    )


@admin_router.post("/categories")
async def create_category(
    category_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):
    try:
        category = category_models.Category(**category_data)
        db.add(category)
        db.commit()
        db.refresh(category)
        return create_response(
            status_code=status.HTTP_201_CREATED,
            message="Category created successfully",
            data=category,
        )
    except Exception as e:
        db.rollback()
        return create_response(
            status_code=status.HTTP_400_BAD_REQUEST,
            message=f"Failed to create category: {str(e)}",
        )


@admin_router.put("/categories/{category_id}")
async def update_category(
    category_id: int,
    category_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):
    category = (
        db.query(category_models.Category)
        .filter(category_models.Category.id == category_id)
        .first()
    )
    if not category:
        return create_response(
            status_code=status.HTTP_404_NOT_FOUND,
            message="Category not found",
        )

    # Update category fields if provided
    for field, value in category_data.items():
        setattr(category, field, value)

    try:
        db.commit()
        db.refresh(category)
        return create_response(
            status_code=status.HTTP_200_OK,
            message="Category updated successfully",
            data=category,
        )
    except Exception as e:
        db.rollback()
        return create_response(
            status_code=status.HTTP_400_BAD_REQUEST,
            message=f"Failed to update category: {str(e)}",
        )


@admin_router.delete("/categories/{category_id}")
async def delete_category(
    category_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):
    category = (
        db.query(category_models.Category)
        .filter(category_models.Category.id == category_id)
        .first()
    )
    if not category:
        return create_response(
            status_code=status.HTTP_404_NOT_FOUND,
            message="Category not found",
        )

    try:
        db.delete(category)
        db.commit()
        return create_response(
            status_code=status.HTTP_200_OK,
            message="Category deleted successfully",
        )
    except Exception as e:
        db.rollback()
        return create_response(
            status_code=status.HTTP_400_BAD_REQUEST,
            message=f"Failed to delete category: {str(e)}",
        )


@admin_router.get("/sales")
async def get_all_sales(
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
    params: dict = Depends(common_parameters),
):
    query = db.query(Checkout)
    total = query.count()
    page = params.get("page", 1)
    page_size = params.get("page_size", 10)
    skip = (page - 1) * page_size

    sales = (
        query.options(
            joinedload(Checkout.user),
            joinedload(Checkout.items).joinedload(CheckoutItem.course),
        )
        .order_by(Checkout.created_at.desc())
        .offset(skip)
        .limit(params["page_size"])
        .all()
    )

    for sale in sales:
        try:
            if hasattr(sale.user, "password"):
                del sale.user.password
        except:
            pass

    return create_paginated_response(
        data=sales,
        total=total,
        page=params["page"],
        page_size=params["page_size"],
        path="/admin/sales",
    )


@admin_router.put("/courses/{course_id}/make-featured")
async def make_course_featured(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):
    course = (
        db.query(course_models.Course)
        .filter(course_models.Course.id == course_id)
        .first()
    )
    if not course:
        return create_response(
            status_code=status.HTTP_404_NOT_FOUND,
            message="Course not found",
        )
    if course.is_featured:
        return create_response(
            status_code=status.HTTP_400_BAD_REQUEST,
            message="Course already featured",
        )
    course.is_featured = True
    db.commit()
    db.refresh(course)
    return create_response(
        status_code=status.HTTP_200_OK,
        message="Course made featured successfully",
        data=course,
    )


@admin_router.put("/courses/{course_id}/remove-from-featured")
async def remove_course_from_featured(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):
    course = (
        db.query(course_models.Course)
        .filter(course_models.Course.id == course_id)
        .first()
    )
    if not course:
        return create_response(
            status_code=status.HTTP_404_NOT_FOUND,
            message="Course not found",
        )
    if not course.is_featured:
        return create_response(
            status_code=status.HTTP_400_BAD_REQUEST,
            message="Course is not featured",
        )
    course.is_featured = False
    db.commit()
    db.refresh(course)
    return create_response(
        status_code=status.HTTP_200_OK,
        message="Course removed from featured successfully",
        data=course,
    )


@admin_router.put("/courses/{course_id}/make-popular")
async def make_course_popular(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):
    course = (
        db.query(course_models.Course)
        .filter(course_models.Course.id == course_id)
        .first()
    )
    if not course:
        return create_response(
            status_code=status.HTTP_404_NOT_FOUND,
            message="Course not found",
        )
    if course.is_popular:
        return create_response(
            status_code=status.HTTP_400_BAD_REQUEST,
            message="Course already popular",
        )
    course.is_popular = True
    db.commit()
    db.refresh(course)
    return create_response(
        status_code=status.HTTP_200_OK,
        message="Course made popular successfully",
        data=course,
    )


@admin_router.put("/courses/{course_id}/remove-from-popular")
async def remove_course_from_popular(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):
    course = (
        db.query(course_models.Course)
        .filter(course_models.Course.id == course_id)
        .first()
    )
    if not course:
        return create_response(
            status_code=status.HTTP_404_NOT_FOUND,
            message="Course not found",
        )
    if not course.is_popular:
        return create_response(
            status_code=status.HTTP_400_BAD_REQUEST,
            message="Course is not popular",
        )
    course.is_popular = False
    db.commit()
    db.refresh(course)
    return create_response(
        status_code=status.HTTP_200_OK,
        message="Course removed from popular successfully",
        data=course,
    )
