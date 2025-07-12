from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
import uuid

from app.schemas.schemas import UserBase, LoginData, UserResponse, MessageResponse
from app.models.models import User
from app.core.security import async_hash_password, async_verify_password
from app.db.transaction import transactional
from app.services.mailService import mailService
from app.services.tokenService import TokenService
from app.core.config import API_URL
from app.dtos.userDto import UserDto
from app.exceptions.apiError import ApiError


class UserService:
    @staticmethod
    async def registration(user: UserBase, db: AsyncSession):
        user_data = {**user.model_dump()}

        result = await db.execute(select(User).where(User.email == user_data["email"]))
        candidate = result.scalar_one_or_none()
        if candidate:
            raise ApiError.BadRequest(
                message="A user with such an email already exists"
            )

        user_data["password"] = await async_hash_password(user_data["password"])
        activation_link = f"{API_URL}/auth/activate/{uuid.uuid4().hex}"

        new_user = User(**{**user_data, "activation_link": activation_link})
        async with transactional(db):
            db.add(new_user)
        await db.refresh(new_user)

        userDto = UserDto(new_user)
        tokens = TokenService.generate_tokens(userDto.to_dict)
        await TokenService.save_refresh_token(userDto.id, tokens["refresh_token"], db)

        await mailService.send_activation_mail(to=userDto.email, link=activation_link)

        return LoginData(
            access_token=tokens["access_token"],
            refresh_token=tokens["refresh_token"],
            user=userDto.to_dict,
        )

    @staticmethod
    async def login(user: UserBase, db: AsyncSession):
        user_data = {**user.model_dump()}

        result = await db.execute(select(User).where(User.email == user_data["email"]))
        candidate = result.scalar_one_or_none()
        if not candidate:
            raise ApiError.BadRequest(
                message="There is no user with this email address"
            )

        password_is_valid = await async_verify_password(
            user_data["password"], candidate.password
        )
        if not password_is_valid:
            raise ApiError.BadRequest(message="The entered password is incorrect")

        userDto = UserDto(candidate)
        tokens = TokenService.generate_tokens(userDto.to_dict)
        await TokenService.save_refresh_token(userDto.id, tokens["refresh_token"], db)

        return LoginData(
            access_token=tokens["access_token"],
            refresh_token=tokens["refresh_token"],
            user=userDto.to_dict,
        )

    @staticmethod
    async def logout(refresh_token: str, db: AsyncSession):
        token = await TokenService.find_token(refresh_token, db)
        if token:
            await TokenService.remove_token(refresh_token, db)
        return MessageResponse(
            message="The user has successfully logged out of the account"
        )

    @staticmethod
    async def activate(activation_link: str, db: AsyncSession):
        result = await db.execute(
            select(User).where(User.activation_link == activation_link)
        )
        user = result.scalars().first()
        if not user:
            raise ApiError.BadRequest(message="Invalid activation link")

        async with transactional(db):
            user.is_activated = True

    @staticmethod
    async def refresh(refresh_token: str, db: AsyncSession):
        pass

    @staticmethod
    async def get_users(db: AsyncSession):
        result = await db.execute(select(User).order_by(User.id.desc()))
        users = result.scalars().all()
        return [UserResponse.model_validate(user) for user in users]
