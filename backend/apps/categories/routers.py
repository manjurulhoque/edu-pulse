from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status

from apps.categories.models import Category
from apps.categories.schemas import CategorySchema
from apps.users.services import get_current_user
from apps.users.models import User
from conf.database import get_db
from utils.response_utils import create_response

router = APIRouter()


@router.get("/categories/", response_model=List[CategorySchema])
def get_categories(db: Session = Depends(get_db)):
    categories = db.query(Category).all()
    category_schemas = [
        CategorySchema.model_validate(category).model_dump()
        for category in categories
    ]
    return create_response(
        data=category_schemas,
        message="All categories",
    )


@router.post("/categories/")
def create_category(
    category_data: CategorySchema,  # Include the category data in the request
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Check if the current user is an admin
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can create categories",
        )

    # Proceed with category creation
    new_category = Category(
        name=category_data.name, description=category_data.description
    )
    db.add(new_category)
    db.commit()
    db.refresh(new_category)

    return create_response(
        data=CategorySchema.model_validate(new_category).model_dump(),
        message="Category created successfully",
    )
