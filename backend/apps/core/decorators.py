from fastapi import HTTPException, Depends, status
from apps.users.services import get_current_user
from apps.users.models import User


def auth_required(current_user: User = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not authenticated"
        )
    return current_user
