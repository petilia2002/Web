from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete

from app.schemas.schemas import RoleBase
from app.exceptions import ItemNotFound
from app.db.transaction import transactional
from app.models.models import Role


class RoleService:
    @staticmethod
    async def get_all_roles(db: AsyncSession):
        result = await db.execute(select(Role).order_by(Role.id.desc()))
        return result.scalars().all()

    @staticmethod
    async def get_role_by_id(db: AsyncSession, role_id: int):
        result = await db.execute(select(Role).where(Role.id == role_id))
        post = result.scalars().first()
        if not post:
            raise ItemNotFound(role_id, "Role")
        return post

    @staticmethod
    async def create_role(db: AsyncSession, role: RoleBase):
        new_role = Role(**role.model_dump())
        async with transactional(db):
            db.add(new_role)
        return new_role

    @staticmethod
    async def update_role(db: AsyncSession, role: RoleBase):
        id = role.model_dump().get("id")
        if not id:
            raise KeyError("Missing required id parameter")

        result = await db.execute(select(Role).where(Role.id == id))
        candidate = result.scalars().first()
        if not candidate:
            raise ItemNotFound(id, "Role")

        async with transactional(db):
            update_data = role.model_dump(exclude_unset=True, exclude={"id"})
            for key, value in update_data.items():
                if hasattr(candidate, key):
                    setattr(candidate, key, value)

        return candidate

    @staticmethod
    async def delete_role(db: AsyncSession, role_id: int):
        result = await db.execute(select(Role).where(Role.id == role_id))
        candidate = result.scalar_one_or_none()
        if not candidate:
            raise ItemNotFound(role_id, "Role")

        async with transactional(db):
            await db.execute(delete(Role).where(Role.id == role_id))

        return candidate
