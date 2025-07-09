from fastapi import APIRouter, Depends, Form, File, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.db.database import get_async_db
from app.schemas.schemas import UserResponse, MessageResponse, TokenResponse, UserBase
from app.controllers.authController import AuthController
from app.utils.user_parser import parse_user
from app.utils.request_parser import parse_request, RequestData

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
async def get_users(
    user_data: RequestData = Depends(parse_request),
    db: AsyncSession = Depends(get_async_db),
):
    return await AuthController.get_users(db)


# @router.post("/users", response_model=List[UserResponse])
# async def get_users(
#     user: UserBase,
#     db: AsyncSession = Depends(get_async_db),
# ):
#     print(user)
#     return await AuthController.get_users(db)
