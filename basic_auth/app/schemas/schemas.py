from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class UserBase(BaseModel):
    name: str
    password: str


class UserResponse(UserBase):
    id: int
    registered_at: datetime

    class Config:
        from_attributes = True


class UserData(BaseModel):
    id: Optional[int] = None
    author: str
    title: str
    content: str


class RoleBase(BaseModel):
    name: str


class RoleResponse(RoleBase):
    id: int

    class Config:
        from_attributes = True


class RoleData(BaseModel):
    id: Optional[int] = None
    name: str


class MessageResponse(BaseModel):
    message: str
