from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_async_db
from app.schemas.schemas import UserBase, MessageResponse, LoginData
from app.controllers.userController import UserController
from app.utils.request_parser import RequestData, parse_request

router = APIRouter(tags=["auth"], responses={404: {"description": "Not Found"}})


@router.post(path="/registration", response_model=LoginData)
async def registration(
    req: RequestData = Depends(parse_request), db: AsyncSession = Depends(get_async_db)
):
    return await UserController.registration(req, db)


@router.post(path="/login", response_model=MessageResponse)
async def login(
    req: RequestData = Depends(parse_request), db: AsyncSession = Depends(get_async_db)
):
    return await UserController.login(req, db)


@router.post(path="/logout", response_model=MessageResponse)
async def logout(db: AsyncSession = Depends(get_async_db)):
    return await UserController.logout(db)


@router.get(path="/activate/{link}")
async def activate(request: Request, db: AsyncSession = Depends(get_async_db)):
    return await UserController.activate(request, db)


@router.get(path="/refresh", response_model=MessageResponse)
async def refresh(db: AsyncSession = Depends(get_async_db)):
    return await UserController.refresh(db)


@router.get(path="/users", response_model=MessageResponse)
async def get_users(db: AsyncSession = Depends(get_async_db)):
    return await UserController.get_users(db)
