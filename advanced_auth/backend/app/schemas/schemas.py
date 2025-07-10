from pydantic import BaseModel
from typing import List
from pydantic import BaseModel, Field, field_validator, EmailStr


class UserBase(BaseModel):
    email: EmailStr = Field(..., description="Valid email address")
    password: str = Field(..., min_length=4, max_length=24, description="Password")

    @field_validator("password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        if " " in v:
            raise ValueError("Password must not contain spaces")
        return v


class UserResponse(BaseModel):
    id: int
    email: str
    password: str
    activation_link: str
    is_activated: bool

    class Config:
        from_attributes = True


class MessageResponse(BaseModel):
    message: str


class TokenResponse(BaseModel):
    token: str
