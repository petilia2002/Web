from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.schemas import UserBase, MessageResponse
from app.utils.request_parser import RequestData
from app.services.userService import UserService


class UserController:
    @staticmethod
    async def registration(req: RequestData, db: AsyncSession):
        try:
            return await UserService.registration(UserBase(**req.body), db)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def login(req: RequestData, db: AsyncSession):
        try:
            return await UserService.login(UserBase(**req.body), db)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def logout(db: AsyncSession):
        try:
            return await UserService.logout(db)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def activate(db: AsyncSession):
        try:
            return await UserService.activate(db)
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
