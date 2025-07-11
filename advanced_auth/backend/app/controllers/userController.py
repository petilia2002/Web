from fastapi import HTTPException, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import ValidationError

from app.schemas.schemas import UserBase
from app.utils.request_parser import RequestData
from app.services.userService import UserService
from app.core.config import CLIENT_URL


class UserController:
    @staticmethod
    async def registration(req: RequestData, db: AsyncSession):
        try:
            return await UserService.registration(UserBase(**req.body), db)
        except ValidationError as e:
            messages = [err["msg"] for err in e.errors()]
            raise HTTPException(status_code=400, detail=messages)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def login(req: RequestData, db: AsyncSession):
        try:
            return await UserService.login(UserBase(**req.body), db)
        except ValidationError as e:
            messages = [err["msg"] for err in e.errors()]
            raise HTTPException(status_code=400, detail=messages)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def logout(db: AsyncSession):
        try:
            return await UserService.logout(db)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def activate(request: Request, db: AsyncSession):
        try:
            await UserService.activate(str(request.url), db)
            return RedirectResponse(url=CLIENT_URL, status_code=302)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def refresh(db: AsyncSession):
        try:
            return await UserService.refresh(db)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def get_users(db: AsyncSession):
        try:
            return await UserService.get_users(db)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
