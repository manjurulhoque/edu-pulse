from sqlalchemy import Column, DateTime, func

from conf.database import Base


class BaseModel(Base):
    __abstract__ = True

    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(
        DateTime, server_default=func.now(), onupdate=func.now()
    )
