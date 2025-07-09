from fastapi import Depends, HTTPException
from typing import List

from app.dependencies.authDependency import require_auth


def require_roles(allowed_roles: List[str]):
    async def _role_checker(user: dict = Depends(require_auth)):
        user_roles = user.get("roles")

        if not any(role in allowed_roles for role in user_roles):
            raise HTTPException(status_code=403, detail="No access rights")
        return user

    return _role_checker
