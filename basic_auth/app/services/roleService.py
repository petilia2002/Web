from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete

from app.schemas.schemas import RoleBase
from app.exceptions import ItemNotFound
from app.db.transaction import transactional


class RoleService:
    @staticmethod
    async def get_all_roles(db: AsyncSession):
        pass

    @staticmethod
    async def get_role_by_id(db: AsyncSession, role_id: int):
        pass

    @staticmethod
    async def create_role(db: AsyncSession, role: RoleBase):
        pass

    @staticmethod
    async def update_role(db: AsyncSession, role: RoleBase):
        pass

    @staticmethod
    async def delete_role(db: AsyncSession, role_id: int):
        pass
