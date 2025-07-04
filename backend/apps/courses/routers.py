import json

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from pydantic import ValidationError
from sqlalchemy import func
from sqlalchemy.orm import Session, joinedload
from starlette import status
from starlette.requests import Request

from apps.categories.models import Category
from apps.core.decorators import (
    admin_or_instructor_required,
    auth_required,
    instructor_required,
)
from apps.core.enums import CourseStatus
from apps.courses import services
from apps.courses.decorators import course_owner_required
from apps.courses.models import Course, CourseSection
from apps.courses.schemas import CourseSchema
from apps.enrollments.models import Enrollment, LessonCompletion
from apps.lessons.models import Lesson
from apps.reviews.models import CourseReview
from apps.users.models import User
from conf.database import get_db
from utils.params import common_parameters
from utils.response_utils import create_paginated_response, create_response
from utils.upload import save_image

router = APIRouter()


@router.get("/all-courses", summary="Get all courses")
async def all_courses(
    db: Session = Depends(get_db), params: dict = Depends(common_parameters)
):
    """
    Get all courses
    """
    query = db.query(Course).filter(Course.status == CourseStatus.PUBLISHED)
    total = query.count()
    page = params.get("page", 1)
    page_size = params.get("page_size", 8)
    skip = (page - 1) * page_size
    courses = (
        query.options(joinedload(Course.user), joinedload(Course.category))
        .offset(skip)
        .limit(params["page_size"])
        .all()
    )

    # Add lessons count for each course
    for course in courses:
        try:
            # Safely remove password if it exists
            if (
                course.user
                and hasattr(course.user, "password")
                and course.user.password
            ):
                delattr(course.user, "password")
            # Count total lessons in the course
            course.lessons_count = (
                db.query(Lesson)
                .filter(Lesson.course_id == course.id, Lesson.is_published == True)
                .count()
            )
        except Exception as e:
            print(e)
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


@router.post("/create-course", summary="Create new course")
async def create_course(
    course_input: str = Form(...),
    preview_image: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(instructor_required),
):
    """
    Create new course as an instructor
    """
    try:
        course_data_dict = json.loads(course_input)
        course_data = CourseSchema(**course_data_dict)
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid JSON format"
        )
    except ValidationError as e:
        # If validation fails, return a 422 Unprocessable Entity with details
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(e)
        )

    course_data_dict = course_data.model_dump()
    course_data_dict["preview_image"] = await save_image(preview_image)

    new_course = services.create_course(db, course_data_dict, current_user)
    return create_response(
        data=new_course,
        message="Course created successfully",
        status_code=status.HTTP_201_CREATED,
    )


@router.put("/update-course/{course_id}")
async def update_course(
    course_id: int,
    course_input: str = Form(...),
    preview_image: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(instructor_required),
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
        course_data = CourseSchema(**course_data_dict)
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid JSON format"
        )
    except ValidationError as e:
        # If validation fails, return a 422 Unprocessable Entity with details
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(e)
        )

    course_data_dict = course_data.model_dump()
    if preview_image:
        course_data_dict["preview_image"] = await save_image(preview_image)
    elif course.preview_image:
        course_data_dict["preview_image"] = course.preview_image

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


@router.get(
    "/my-created-courses", summary="Get all courses created by the current user"
)
def my_created_courses(
    db: Session = Depends(get_db),
    current_user: User = Depends(instructor_required),
    params: dict = Depends(common_parameters),
):
    """
    Get all courses created by the current user
    """
    page = params.get("page", 1)
    page_size = params.get("page_size", 8)
    skip = (page - 1) * page_size
    total = db.query(Course).filter(Course.user_id == current_user.id).count()
    courses = (
        db.query(Course)
        .filter(Course.user_id == current_user.id)
        .order_by(Course.updated_at.desc())
        .offset(skip)
        .limit(page_size)
        .all()
    )
    return create_paginated_response(
        data=courses,
        total=total,
        page=page,
        page_size=page_size,
        path="/my-created-courses",
    )


@router.post("/publish-course", summary="Publish course")
async def publish_course(
    course_id: int = Form(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(instructor_required),
):
    """
    Publish course
    """
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
    if course.status == CourseStatus.PUBLISHED:
        return create_response(
            data=None,
            status_code=status.HTTP_304_NOT_MODIFIED,
            message="Course was already published",
        )
    course.status = CourseStatus.PUBLISHED
    db.add(course)
    db.commit()
    db.refresh(course)
    return create_response(data=course, message="Course published successfully")


@router.get("/course/{slug}", summary="Get single course")
async def single_course(slug: str, db: Session = Depends(get_db)):
    """
    Get single course
    """
    course = (
        db.query(Course)
        .options(
            joinedload(Course.user),
            joinedload(Course.category),
            joinedload(Course.sections).joinedload(
                CourseSection.lessons.and_(Lesson.is_published == True)
            ),
        )
        .filter(Course.status == CourseStatus.PUBLISHED, Course.slug == slug)
        .first()
    )
    if hasattr(course.user, "password"):
        del course.user.password

    return create_response(data=course)


@router.get("/course-details/{slug}", summary="Get course details")
async def course_details_for_admin_and_instructor(
    slug: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_or_instructor_required),
):
    """
    Get course details for admin and instructor
    """
    course = (
        db.query(Course)
        .options(
            joinedload(Course.user),
            joinedload(Course.category),
            joinedload(Course.sections).joinedload(CourseSection.lessons),
        )
        .filter(Course.slug == slug)
        .first()
    )
    if hasattr(course.user, "password"):
        del course.user.password

    return create_response(data=course)


@router.get("/course/{slug}/sections", summary="Get course sections")
async def course_sections(
    slug: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(auth_required),
):
    """
    Get course sections
    """
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


@router.put(
    "/course/{course_id}/update-curriculum",
    dependencies=[Depends(course_owner_required)],
    response_model=CourseSchema,
    summary="Update course curriculum",
)
async def update_curriculum(
    course_id: int,
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(instructor_required),
):
    """
    Update course curriculum
    """
    data = await request.json()
    sections = data.get("sections", [])
    section_ids_to_keep = [
        section.get("id") for section in sections if section.get("id")
    ]

    # Delete sections that are not in the provided list
    db.query(CourseSection).filter(
        CourseSection.course_id == course_id,
        CourseSection.id.notin_(section_ids_to_keep),
    ).delete(synchronize_session=False)
    db.commit()

    course = db.query(Course).filter(Course.id == course_id).first()

    for section in sections:
        section_id = section.get("id")
        if section_id:
            course_section = (
                db.query(CourseSection)
                .filter(
                    CourseSection.id == section_id, CourseSection.course_id == course.id
                )
                .first()
            )
            if not course_section:
                continue
            course_section.title = section.get("title")
            db.add(course_section)
            db.commit()
            db.refresh(course_section)
            db_section = course_section
        else:
            new_section = CourseSection(
                title=section.get("title"),
                course_id=course_id,
            )
            db.add(new_section)
            db.commit()
            db.refresh(new_section)
            course.sections.append(new_section)
            section_id = new_section.id
            db_section = new_section

        # Handle lessons
        lesson_ids_to_keep = [
            lesson.get("id")
            for lesson in section.get("lessons", [])
            if lesson.get("id")
        ]

        # Delete lessons that are not in the provided list
        db.query(Lesson).filter(
            Lesson.section_id == section_id,
            Lesson.id.notin_(lesson_ids_to_keep),
        ).delete(synchronize_session=False)
        db.commit()

        for lesson in section.get("lessons", []):
            lesson_id = lesson.get("id")
            if lesson_id:
                course_lesson = (
                    db.query(Lesson)
                    .filter(Lesson.id == lesson_id, Lesson.section_id == section_id)
                    .first()
                )
                if not course_lesson:
                    continue
                course_lesson.title = lesson.get("title")
                course_lesson.content = lesson.get("content")
                course_lesson.is_free = lesson.get("is_free")
                course_lesson.is_published = lesson.get("is_published")
                db.add(course_lesson)
                db.commit()
                db.refresh(course_lesson)
            else:
                new_lesson = Lesson(
                    title=lesson.get("title"),
                    content=lesson.get("content"),
                    section_id=section_id,
                    course_id=course_id,
                    is_free=lesson.get("is_free"),
                    is_published=lesson.get("is_published"),
                )
                db.add(new_lesson)
                db.commit()
                db.refresh(new_lesson)
                db_section.lessons.append(new_lesson)
    db.expire_all()
    return course


@router.get("/course/{course_id}/instructor", summary="Get course instructor")
async def get_course_instructor(course_id: int, db: Session = Depends(get_db)):
    """
    Get course instructor
    """
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    total_students = len(course.enrollments)
    total_published_courses = (
        db.query(Course)
        .filter(
            Course.status == CourseStatus.PUBLISHED, Course.user_id == course.user_id
        )
        .count()
    )

    return {
        "instructor": course.user,
        "total_students": total_students,
        "total_published_courses": total_published_courses,
    }


@router.get("/courses-by-category/{category_slug}", summary="Get courses by category")
async def get_courses_by_category(category_slug: str, db: Session = Depends(get_db)):
    """
    Get courses by category
    """
    category = db.query(Category).filter(Category.slug == category_slug).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    courses = (
        db.query(Course)
        .filter(Course.category_id == category.id)
        .options(joinedload(Course.user), joinedload(Course.category))
        .all()
    )
    return create_response(data=courses)


@router.get("/enrolled-courses", summary="Get enrolled courses for the current user")
async def enrolled_courses(
    db: Session = Depends(get_db),
    current_user: User = Depends(auth_required),
    params: dict = Depends(common_parameters),
):
    """
    Get enrolled courses for the current user
    """
    if not current_user:
        return create_response(
            data=None,
            status_code=status.HTTP_401_UNAUTHORIZED,
            message="You must be logged in to access this resource",
        )
    # get enrolled courses for the current user
    page = params.get("page", 1)
    page_size = params.get("page_size", 8)
    skip = (page - 1) * page_size
    total = (
        db.query(Course)
        .filter(Course.enrollments.any(Enrollment.user_id == current_user.id))
        .count()
    )
    courses = (
        db.query(Course)
        .filter(Course.enrollments.any(Enrollment.user_id == current_user.id))
        .options(joinedload(Course.user), joinedload(Course.category))
        .offset(skip)
        .limit(params["page_size"])
        .all()
    )
    return create_response(
        data=create_paginated_response(
            data=courses,
            total=total,
            page=params["page"],
            page_size=params["page_size"],
            path="/enrolled-courses",
        )
    )


@router.get("/is-already-enrolled/{course_id}")
async def is_already_enrolled(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(auth_required),
):
    """
    Endpoint to check if current user already enrolled in the course or not
    """
    enrollment = (
        db.query(Enrollment)
        .filter(
            Enrollment.user_id == current_user.id, Enrollment.course_id == course_id
        )
        .first()
    )

    if not enrollment:
        return create_response(data=None)
    return create_response(data=dict(enrolled=True, enrolled_at=enrollment.enrolled_at))


@router.get("/course-progress/{course_id}", summary="Get course progress")
async def get_course_progress(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(auth_required),
):
    """
    Get course progress for the current user
    """
    course = (
        db.query(Course)
        .filter(Course.id == course_id, Course.status == CourseStatus.PUBLISHED)
        .first()
    )
    if not course:
        return create_response(
            data=None,
            status_code=status.HTTP_404_NOT_FOUND,
            message="Course not found",
        )
    enrollment = (
        db.query(Enrollment)
        .filter(
            Enrollment.user_id == current_user.id, Enrollment.course_id == course_id
        )
        .first()
    )
    if not enrollment:
        return create_response(
            data=None,
            status_code=status.HTTP_404_NOT_FOUND,
            message="You are not enrolled in this course",
        )
    total_lessons = (
        db.query(Lesson)
        .filter(
            Lesson.course_id == course_id,
            Lesson.is_published == True,
        )
        .count()
    )
    # get completed lessons for the current user
    # Query to count completed lessons:
    # 1. Get LessonCompletion records for current user
    # 2. Filter for lessons that belong to this course (using subquery)
    # 3. Only count lessons marked as completed (is_completed=True)
    # 4. Ensure completion timestamp exists (completed_at not null)
    completed_lessons = (
        db.query(LessonCompletion)
        .filter(
            LessonCompletion.user_id == current_user.id,
            LessonCompletion.lesson_id.in_(
                db.query(Lesson.id).filter(
                    Lesson.course_id == course_id, Lesson.is_published == True
                )
            ),
            LessonCompletion.is_completed == True,
            LessonCompletion.completed_at.isnot(None),
        )
        .count()
    )

    # Calculate progress percentage by dividing completed lessons by total lessons
    # Multiply by 100 to get percentage value
    progress = (completed_lessons / total_lessons) * 100
    return create_response(data=progress)


@router.get("/course-review-rating/{course_id}", summary="Get course review rating")
async def get_course_review_rating(course_id: int, db: Session = Depends(get_db)):
    """
    Get course review rating
    """
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        return create_response(
            data=None, status_code=status.HTTP_404_NOT_FOUND, message="Course not found"
        )
    
    # get course total review count
    total_review_count = (
        db.query(CourseReview).filter(CourseReview.course_id == course_id).count()
    )
    
    if total_review_count == 0:
        return create_response(
            data={
                "total_review_count": 0,
                "total_rating": 0,
                "average_rating": 0,
            }
        )
    
    # get course total rating
    total_rating = db.query(func.sum(CourseReview.rating)).filter(CourseReview.course_id == course_id).scalar() or 0
    
    # get course average rating
    average_rating = round(total_rating / total_review_count, 2)
    
    return create_response(
        data={
            "total_review_count": total_review_count,
            "total_rating": total_rating,
            "average_rating": average_rating,
        }
    )
