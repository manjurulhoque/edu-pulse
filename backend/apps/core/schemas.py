from typing import Optional, TypeVar, Generic

from pydantic import ConfigDict, BaseModel
from pydantic.generics import GenericModel

T = TypeVar("T")


class BaseSchemaModel(BaseModel):
    model_config = ConfigDict()


class UserUpdate(BaseModel):
    """
    User update schema for admin
    """

    name: Optional[str] = None
    email: Optional[str] = None
    is_active: Optional[bool] = None
    is_admin: Optional[bool] = None
    is_instructor: Optional[bool] = None


class BaseReturn(GenericModel, Generic[T]):
    data: T
    message: Optional[str] = None
    status_code: Optional[int] = 200
