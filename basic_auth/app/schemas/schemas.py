from pydantic import BaseModel
from datetime import datetime


class UserBase(BaseModel):
    name: str
    password: str


class UserResponse(UserBase):
    id: int
    registered_at: datetime

    class Config:
        from_attributes = True


class RoleBase(BaseModel):
    name: str


class RoleResponse(RoleBase):
    id: int

    class Config:
        from_attributes = True


class MessageResponse(BaseModel):
    message: str
