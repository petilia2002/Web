from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.authService import AuthService
from app.exceptions import ItemNotFound
from app.schemas.schemas import UserBase


class AuthController:
    @staticmethod
    async def registration(db: AsyncSession, user: UserBase):
        return await AuthService.registration(db, user)

    @staticmethod
    async def login(db: AsyncSession, user: UserBase):
        return await AuthService.login(db, user)

    @staticmethod
    async def get_users(db: AsyncSession):
        return await AuthService.get_users(db)
