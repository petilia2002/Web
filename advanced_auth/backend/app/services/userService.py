from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.schemas import UserBase, MessageResponse


class UserService:
    @staticmethod
    async def registration(user: UserBase, db: AsyncSession):
        pass

    @staticmethod
    async def login(user: UserBase, db: AsyncSession):
        pass

    @staticmethod
    async def logout(db: AsyncSession):
        pass

    @staticmethod
    async def activate(db: AsyncSession):
        pass

    @staticmethod
    async def refresh(db: AsyncSession):
        pass

    @staticmethod
    async def get_users(db: AsyncSession):
        pass
