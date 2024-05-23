from sqlalchemy.orm import Session

from apps.courses import schemas, models as course_models
from apps.users import models as user_models


def create_course(
    db: Session,
    form_data: schemas.CourseSchema,
    current_user: user_models.User,
):
    db_new_course = course_models.Course(**form_data.model_dump())
    db_new_course.user_id = current_user.id
    db.add(db_new_course)
    db.commit()
    db.refresh(db_new_course)
    return db_new_course
