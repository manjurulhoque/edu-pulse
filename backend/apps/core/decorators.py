from fastapi import HTTPException, Depends, status
from apps.users.services import get_current_user
from apps.users.models import User


def auth_required(current_user: User = Depends(get_current_user)):
    """
    This decorator is used to check if the user is authenticated.
    """
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User is not authenticated",
        )
    return current_user


def admin_required(current_user: User = Depends(auth_required)):
    """
    This decorator is used to check if the user is an admin.
    """
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="User is not an admin"
        )
    return current_user


def instructor_required(current_user: User = Depends(auth_required)):
    """
    This decorator is used to check if the user is an instructor.
    """
    if not current_user.is_instructor:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="User is not an instructor"
        )
    return current_user


def admin_or_instructor_required(current_user: User = Depends(auth_required)):
    """
    This decorator is used to check if the user is an admin or instructor.
    """
    if not current_user.is_admin and not current_user.is_instructor:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User is not an admin or instructor",
        )
    return current_user
