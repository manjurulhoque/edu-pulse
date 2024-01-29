from typing import Any

from fastapi import status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse


def create_response(
    data: Any = None, message: str = "", status_code: int = status.HTTP_200_OK
):
    json_compatible_item_data = jsonable_encoder(data)
    return JSONResponse(
        status_code=status_code,
        content=dict(message=message, data=json_compatible_item_data),
    )
