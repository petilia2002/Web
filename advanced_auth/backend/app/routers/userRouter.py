from fastapi import APIRouter, Depends, Request, Response, Cookie
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.db.database import get_async_db
from app.schemas.schemas import UserResponse, LoginData, MessageResponse
from app.controllers.userController import UserController
from app.utils.request_parser import RequestData, parse_request
from app.dependencies.authDependency import require_auth

router = APIRouter(tags=["auth"], responses={404: {"description": "Not Found"}})


@router.post(path="/registration", response_model=LoginData)
async def registration(
    res: Response,
    req: RequestData = Depends(parse_request),
    db: AsyncSession = Depends(get_async_db),
):
    return await UserController.registration(req, res, db)


@router.post(path="/login", response_model=LoginData)
async def login(
    res: Response,
    req: RequestData = Depends(parse_request),
    db: AsyncSession = Depends(get_async_db),
):
    return await UserController.login(req, res, db)


@router.post(path="/logout", response_model=MessageResponse)
async def logout(
    res: Response,
    refresh_token: str = Cookie(default=None),
    db: AsyncSession = Depends(get_async_db),
):
    return await UserController.logout(refresh_token, res, db)


@router.get(path="/activate/{link}")
async def activate(request: Request, db: AsyncSession = Depends(get_async_db)):
    return await UserController.activate(request, db)


@router.get(path="/refresh", response_model=MessageResponse)
async def refresh(
    res: Response,
    refresh_token: str = Cookie(default=None),
    db: AsyncSession = Depends(get_async_db),
):
    return await UserController.refresh(refresh_token, res, db)


@router.get(path="/users", response_model=List[UserResponse])
async def get_users(
    _: dict = Depends(require_auth), db: AsyncSession = Depends(get_async_db)
):
    return await UserController.get_users(db)
