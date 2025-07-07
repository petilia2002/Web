from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.schemas import UserData


class AuthService:
    @staticmethod
    async def registration(db: AsyncSession, user: UserData):
        pass

    @staticmethod
    async def login(db: AsyncSession, user: UserData):
        pass

    @staticmethod
    async def get_users(db: AsyncSession):
        pass
