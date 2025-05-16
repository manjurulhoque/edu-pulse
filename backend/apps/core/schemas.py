from typing import Optional, Any

import pydantic
from pydantic import ConfigDict, BaseModel


class BaseSchemaModel(pydantic.BaseModel):
    model_config = ConfigDict()


class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    is_active: Optional[bool] = None
    is_admin: Optional[bool] = None
    is_instructor: Optional[bool] = None


class BaseReturn(BaseModel):
    data: Any
    message: Optional[str] = None
    status_code: Optional[int] = 200
