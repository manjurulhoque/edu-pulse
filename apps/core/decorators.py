from fastapi import HTTPException, Depends
from apps.users.helpers import get_current_user
from apps.users.models import User


def auth_required(current_user: User = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(
            status_code=401,
            detail="User not authenticated"
        )
    return current_user
