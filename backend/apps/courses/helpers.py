from sqlalchemy.orm import Session

from apps.courses import schemas, models as course_models
from apps.users import models as user_models


def create_course(
    db: Session,
    course_data: dict,
    current_user: user_models.User,
):
    course_data["user_id"] = current_user.id  # Set the user ID
    db_new_course = course_models.Course(**course_data)
    db.add(db_new_course)
    db.commit()
    db.refresh(db_new_course)
    return db_new_course
