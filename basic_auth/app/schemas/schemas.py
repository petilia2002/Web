from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List


class RoleBase(BaseModel):
    id: Optional[int] = None
    name: str


class RoleResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True


class UserBase(BaseModel):
    username: str
    password: str


class UserResponse(UserBase):
    id: int
    roles: List[str]

    class Config:
        from_attributes = True


class MessageResponse(BaseModel):
    message: str


class TokenResponse(BaseModel):
    token: str
