import pydantic
from pydantic import ConfigDict


class BaseSchemaModel(pydantic.BaseModel):
    model_config = ConfigDict()
