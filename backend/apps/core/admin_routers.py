from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from conf.database import get_db
from apps.users.models import User
from apps.core.decorators import admin_required

admin_router = APIRouter(prefix="/admin", tags=["admin"])


@admin_router.get("/courses")
async def get_all_courses(
    db: Session = Depends(get_db), current_user: User = Depends(admin_required)
):
    return {"message": "Admin courses"}
