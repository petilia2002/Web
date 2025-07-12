from fastapi import HTTPException, Request, Response
from fastapi.responses import RedirectResponse
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import ValidationError

from app.schemas.schemas import UserBase
from app.utils.request_parser import RequestData
from app.services.userService import UserService
from app.core.config import CLIENT_URL
from app.exceptions.apiError import ApiError


class UserController:
    @staticmethod
    async def registration(req: RequestData, res: Response, db: AsyncSession):
        try:
            user_data = await UserService.registration(UserBase(**req.body), db)
            res.set_cookie(
                key="refresh_token",
                value=user_data.refresh_token,
                max_age=8 * 7 * 24 * 60 * 60,
                secure=False,
                httponly=True,
                samesite="lax",
            )
            return user_data
        except ValidationError as e:
            messages = [err["msg"] for err in e.errors()]
            raise ApiError.BadRequest(message=messages[-1], errors=e.errors())
        except Exception as e:
            raise

    @staticmethod
    async def login(req: RequestData, res: Response, db: AsyncSession):
        try:
            user_data = await UserService.login(UserBase(**req.body), db)
            res.set_cookie(
                key="refresh_token",
                value=user_data.refresh_token,
                max_age=8 * 7 * 24 * 60 * 60,
                secure=False,
                httponly=True,
                samesite="lax",
            )
            return user_data
        except ValidationError as e:
            messages = [err["msg"] for err in e.errors()]
            raise ApiError.BadRequest(message=messages[-1], errors=e.errors())
        except Exception as e:
            raise

    @staticmethod
    async def logout(refresh_token: str, res: Response, db: AsyncSession):
        try:
            res.delete_cookie(key="refresh_token")
            return await UserService.logout(refresh_token, db)
        except Exception as e:
            raise

    @staticmethod
    async def activate(request: Request, db: AsyncSession):
        try:
            await UserService.activate(str(request.url), db)
            return RedirectResponse(url=CLIENT_URL, status_code=302)
        except Exception as e:
            raise

    @staticmethod
    async def refresh(refresh_token: str, res: Response, db: AsyncSession):
        try:
            user_data = await UserService.refresh(refresh_token, db)
            res.set_cookie(
                key="refresh_token",
                value=user_data.refresh_token,
                max_age=8 * 7 * 24 * 60 * 60,
                secure=False,
                httponly=True,
                samesite="lax",
            )
            return user_data
        except Exception as e:
            raise

    @staticmethod
    async def get_users(db: AsyncSession):
        try:
            return await UserService.get_users(db)
        except Exception as e:
            raise
