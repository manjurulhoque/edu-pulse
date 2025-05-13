from fastapi import Query


def common_parameters(
    page: int = Query(1, gt=0), page_size: int = Query(10, gt=0, le=100)
):
    return {"page": page, "page_size": page_size}


def admin_common_parameters(
    page: int = Query(1, gt=0),
    page_size: int = Query(10, gt=0, le=100),
    sort_by: str = Query(None),
    category: str = Query(None),
    instructor: str = Query(None),
    status: str = Query(None),
    price: str = Query(None),
    date: str = Query(None),
    search: str = Query(None),
):
    return {
        "page": page,
        "page_size": page_size,
        "sort_by": sort_by,
        "category": category,
        "instructor": instructor,
        "status": status,
        "price": price,
        "date": date,
        "search": search,
    }
