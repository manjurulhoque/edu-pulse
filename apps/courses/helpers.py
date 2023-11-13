from sqlalchemy.orm import Session

from apps.courses import schemas, models


def create_course(db: Session, form_data: schemas.CourseSchema):
    db_new_course = models.Course(
        title=form_data.title, description=form_data.description
    )
    db.add(db_new_course)
    db.commit()
    db.refresh(db_new_course)
    return db_new_course
