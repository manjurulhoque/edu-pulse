from typing import Any

from fastapi import status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse


def create_paginated_response(data, total, page, page_size, path):
    total_pages = (total + page_size - 1) // page_size
    return {
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": total_pages,
        "next_page": (
            f"{path}?page={page + 1}&page_size={page_size}"
            if page < total_pages
            else None
        ),
        "previous_page": (
            f"{path}?page={page - 1}&page_size={page_size}"
            if page > 1
            else None
        ),
        "first_page": f"{path}?page=1&page_size={page_size}",
        "last_page": f"{path}?page={total_pages}&page_size={page_size}",
        "results": data,
    }


def create_response(
    data: Any = None, message: str = "", status_code: int = status.HTTP_200_OK
):
    json_compatible_item_data = jsonable_encoder(data)
    return JSONResponse(
        status_code=status_code,
        content=dict(message=message, data=json_compatible_item_data),
    )
