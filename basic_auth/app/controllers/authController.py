from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.services.authService import AuthService
from app.schemas.schemas import UserBase


class AuthController:
    @staticmethod
    async def registration(db: AsyncSession, user: UserBase):
        try:
            return await AuthService.registration(db, user)
        except KeyError as e:
            raise HTTPException(status_code=400, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def login(db: AsyncSession, user: UserBase):
        try:
            return await AuthService.login(db, user)
        except KeyError as e:
            raise HTTPException(status_code=400, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def get_users(db: AsyncSession):
        try:
            return await AuthService.get_users(db)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
