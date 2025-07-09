from pydantic import BaseModel, Field, field_validator
from typing import Optional
import re
from datetime import datetime


class PostBase(BaseModel):
    id: Optional[int] = None
    author: str = Field(..., min_length=4, max_length=20)
    title: str
    content: str
    picture: Optional[str] = None

    @field_validator("author")
    @classmethod
    def validate_username(cls, v):
        if not re.match(r"^[a-zA-Z0-9_]+$", v):
            raise ValueError(
                "Author must contain only letters, numbers, and underscores"
            )
        return v


class PostResponse(BaseModel):
    id: int
    author: str
    title: str
    content: str
    picture: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
