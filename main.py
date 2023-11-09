from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse

from conf.database import engine, Base
from apps.users import models as user_models
from apps.courses import models as course_models
from apps.enrollments import models as enrollment_models
from apps.lessons import models as lesson_models
from apps.users import routers as user_routers

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


def init_db():
    Base.metadata.create_all(bind=engine)


@app.on_event("startup")
async def startup_event():
    init_db()


@app.get("/")
def main():
    return RedirectResponse(url="/docs/")


app.include_router(user_routers.router, tags=["users"])
