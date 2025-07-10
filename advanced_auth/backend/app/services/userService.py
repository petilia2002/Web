from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import uuid

from app.schemas.schemas import UserBase, LoginData
from app.models.models import User
from app.core.security import async_hash_password, async_verify_password
from app.db.transaction import transactional
from app.services.mailService import mailService
from app.services.tokenService import TokenService
from app.core.config import API_URL
from app.dtos.userDto import UserDto


class UserService:
    @staticmethod
    async def registration(user: UserBase, db: AsyncSession):
        user_data = {**user.model_dump()}

        result = await db.execute(select(User).where(User.email == user_data["email"]))
        candidate = result.scalar_one_or_none()
        if candidate:
            raise Exception("A user with such an email already exists")

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
        pass

    @staticmethod
    async def logout(db: AsyncSession):
        pass

    @staticmethod
    async def activate(activation_link: str, db: AsyncSession):
        pass

    @staticmethod
    async def refresh(db: AsyncSession):
        pass

    @staticmethod
    async def get_users(db: AsyncSession):
        pass
