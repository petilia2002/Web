from pydantic import BaseModel, ValidationError
from typing import Optional, List
from pydantic import BaseModel, Field, field_validator
import re


class RoleBase(BaseModel):
    id: Optional[int] = None
    name: str


class RoleResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True


class UserBase(BaseModel):
    username: str = Field(..., min_length=3, max_length=20)
    password: str = Field(..., min_length=4)

    @field_validator("username")
    @classmethod
    def validate_username(cls, v):
        if not re.match(r"^[a-zA-Z0-9_]+$", v):
            raise ValidationError(
                "Username must contain only letters, numbers, and underscores"
            )
        return v

    @field_validator("password")
    @classmethod
    def validate_password(cls, v):
        if " " in v:
            raise ValidationError("Password must not contain spaces")
        return v


class UserResponse(BaseModel):
    id: int
    username: str
    password: str
    roles: List[str]

    class Config:
        from_attributes = True


class MessageResponse(BaseModel):
    message: str


class TokenResponse(BaseModel):
    token: str
