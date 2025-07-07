from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.schemas import UserBase
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.schemas.schemas import UserBase, MessageResponse, UserResponse, TokenResponse
from app.models.models import User, Role
from app.core.security import (
    hash_password_sync,
    verify_password_sync,
    async_hash_password,
    async_verify_password,
)
from app.utils.token_generator import generate_access_token
from app.db.transaction import transactional


class AuthService:
    @staticmethod
    async def registration(db: AsyncSession, user: UserBase):
        user_data = {**user.model_dump()}

        result = await db.execute(
            select(User).where(User.username == user_data["username"])
        )
        candidate = result.scalar_one_or_none()
        if candidate:
            raise KeyError("A user with that name already exists")

        user_data["password"] = await async_hash_password(user_data["password"])

        role_query = await db.execute(select(Role).where(Role.name == "user"))
        role = role_query.scalars().first()

        new_user = User(**user_data)
        new_user.roles.append(role)

        async with transactional(db):
            db.add(new_user)

        return MessageResponse(message="The user was successfully created")

    @staticmethod
    async def login(db: AsyncSession, user: UserBase):
        user_data = {**user.model_dump()}

        result = await db.execute(
            select(User)
            .where(User.username == user_data["username"])
            .options(selectinload(User.roles))
        )
        candidate = result.scalar_one_or_none()
        if not candidate:
            raise KeyError("There is no user with that name")

        password_is_valid = await async_verify_password(
            user_data["password"], candidate.password
        )
        if not password_is_valid:
            raise KeyError("Incorrect password entered")

        roles = [role.name for role in candidate.roles]
        token = generate_access_token(candidate.id, candidate.username, roles)
        return TokenResponse(token=token)

    @staticmethod
    async def get_users(db: AsyncSession):
        result = await db.execute(
            select(User).options(selectinload(User.roles)).order_by(User.id.desc())
        )
        users = result.scalars().all()
        return [
            UserResponse(
                id=user.id,
                username=user.username,
                password=user.password,
                roles=[role.name for role in user.roles],
            )
            for user in users
        ]
