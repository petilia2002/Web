from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.db.database import get_async_db
from app.schemas.schemas import RoleResponse, MessageResponse, RoleBase
from app.controllers.roleController import RoleController
from app.utils.role_parser import parse_role

router = APIRouter(
    prefix="/roles",
    tags=["roles"],
    responses={404: {"description": "Not found"}},
)


@router.get("", response_model=List[RoleResponse])
async def get_roles(db: AsyncSession = Depends(get_async_db)):
    return await RoleController.get_all_roles(db)


@router.get("/{post_id}", response_model=RoleResponse)
async def get_role_by_id(role_id: int, db: AsyncSession = Depends(get_async_db)):
    return await RoleController.get_role_by_id(db, role_id=role_id)


@router.post("", response_model=RoleResponse)
async def create_role(
    role: RoleBase = Depends(parse_role),
    db: AsyncSession = Depends(get_async_db),
):
    return await RoleController.create_role(db=db, role=role)


@router.delete("/{post_id}", response_model=RoleResponse)
async def delete_role(role_id: int, db: AsyncSession = Depends(get_async_db)):
    return await RoleController.delete_role(db, role_id)


@router.put("", response_model=RoleResponse)
async def update_role(
    role: RoleBase = Depends(parse_role), db: AsyncSession = Depends(get_async_db)
):
    return await RoleController.update_role(db, role)
