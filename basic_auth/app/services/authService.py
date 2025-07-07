from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.schemas import UserBase


class AuthService:
    @staticmethod
    async def registration(db: AsyncSession, user: UserBase):
        pass

    @staticmethod
    async def login(db: AsyncSession, user: UserBase):
        pass

    @staticmethod
    async def get_users(db: AsyncSession):
        pass
