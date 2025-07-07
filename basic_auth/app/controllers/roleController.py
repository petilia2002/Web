from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.schemas import RoleBase
from app.exceptions import ItemNotFound
from app.services.roleService import RoleService


class RoleController:
    @staticmethod
    async def get_all_roles(db: AsyncSession):
        return await RoleService.get_all_roles(db)

    @staticmethod
    async def get_role_by_id(db: AsyncSession, role_id: int):
        return await RoleService.get_role_by_id(db, role_id)

    @staticmethod
    async def create_role(db: AsyncSession, role: RoleBase):
        return await RoleService.create_role(db, role)

    @staticmethod
    async def update_role(db: AsyncSession, role: RoleBase):
        return await RoleService.update_role(db, role)

    @staticmethod
    async def delete_role(db: AsyncSession, role_id: int):
        return await RoleService.delete_role(db, role_id)
