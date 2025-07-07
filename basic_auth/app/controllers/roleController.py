from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.schemas import RoleData
from app.exceptions import ItemNotFound
from app.services.roleService import RoleService
from app.exceptions import ItemNotFound


class RoleController:
    @staticmethod
    async def get_all_roles(db: AsyncSession):
        try:
            return await RoleService.get_all_roles(db)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def get_role_by_id(db: AsyncSession, role_id: int):
        try:
            return await RoleService.get_role_by_id(db, role_id)
        except ItemNotFound as e:
            raise HTTPException(status_code=404, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def create_role(db: AsyncSession, role: RoleData):
        try:
            return await RoleService.create_role(db, role)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def update_role(db: AsyncSession, role: RoleData):
        try:
            return await RoleService.update_role(db, role)
        except ItemNotFound as e:
            raise HTTPException(status_code=404, detail=str(e))
        except KeyError as e:
            raise HTTPException(status_code=400, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def delete_role(db: AsyncSession, role_id: int):
        try:
            return await RoleService.delete_role(db, role_id)
        except ItemNotFound as e:
            raise HTTPException(status_code=404, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
