from fastapi import Query


def common_parameters(
    page: int = Query(1, gt=0), page_size: int = Query(10, gt=0, le=100)
):
    return {"page": page, "page_size": page_size}
