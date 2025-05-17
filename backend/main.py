from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse
from starlette.staticfiles import StaticFiles

from conf.database import engine, Base
from apps.users import models as user_models
from apps.courses import models as course_models
from apps.enrollments import models as enrollment_models
from apps.lessons import models as lesson_models
from apps.categories import models as categories_models
from apps.cart import models as cart_models
from apps.checkout import models as checkout_models
from apps.reviews import models as review_models
from apps.users import routers as user_routers
from apps.courses import routers as course_routers
from apps.categories import routers as categories_routers
from apps.checkout import routers as checkout_routers
from utils.response_utils import create_response
from apps.cart import routers as cart_routers
from apps.core import admin_routers

load_dotenv()

# user_models.Base.metadata.create_all(bind=engine)

tags_metadata = [
    {
        "name": "users",
        "description": "Operations with users",
    },
]

app = FastAPI(
    title="E-learning API",
    description="Learning FastAPI",
    openapi_tags=tags_metadata,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)
app.mount("/media", StaticFiles(directory="media"), name="media")
app.mount("/static", StaticFiles(directory="static"), name="static")


def init_db():
    Base.metadata.create_all(bind=engine)


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return create_response(message=str(exc.detail), status_code=exc.status_code)


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    # Log the error here
    return create_response(
        message="An unexpected error occurred",
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
    )


@app.on_event("startup")
async def startup_event():
    print("Initializing database...")
    init_db()
    print("Database initialized.")


@app.on_event("shutdown")
def shutdown_event():
    print("Shutting down database connection...")
    engine.dispose()
    print("Database connection closed.")

    # Clear SQLAlchemy cache
    from conf.database import SessionLocal

    session = SessionLocal()
    session.expire_all()
    session.close()
    print("SQLAlchemy cache cleared.")


@app.get("/")
def main():
    return RedirectResponse(url="/docs/")


app.include_router(user_routers.router, prefix="/users", tags=["users"])
app.include_router(course_routers.router, tags=["courses"])
app.include_router(categories_routers.router, tags=["categories"])
app.include_router(cart_routers.router, tags=["cart"])
app.include_router(checkout_routers.router, tags=["checkout"])
app.include_router(admin_routers.admin_router, tags=["admin"])
