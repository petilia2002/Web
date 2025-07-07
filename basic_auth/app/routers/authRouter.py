from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.db.database import get_async_db
from app.schemas.schemas import UserResponse, MessageResponse, TokenResponse, UserBase
from app.controllers.authController import AuthController
from app.utils.user_parser import parse_user

router = APIRouter(
    tags=["auth"],
    responses={404: {"description": "Not found"}},
)


@router.post("/registration", response_model=MessageResponse)
async def registration(
    user: UserBase = Depends(parse_user), db: AsyncSession = Depends(get_async_db)
):
    return await AuthController.registration(db, user=user)


@router.post("/login", response_model=TokenResponse)
async def login(
    user: UserBase = Depends(parse_user),
    db: AsyncSession = Depends(get_async_db),
):
    return await AuthController.login(db=db, user=user)


@router.get("/users", response_model=List[UserResponse])
async def get_users(db: AsyncSession = Depends(get_async_db)):
    return await AuthController.get_users(db)
