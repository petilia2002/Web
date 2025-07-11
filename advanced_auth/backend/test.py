from pydantic import ValidationError, field_validator
from pydantic_core import PydanticCustomError
from pydantic import BaseModel, ValidationError
from pydantic_core import ErrorDetails, InitErrorDetails
from typing import Optional, Dict, Any
from pydantic import BaseModel, Field, field_validator, EmailStr


class UserBase(BaseModel):
    @field_validator("password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        if " " in v:
            raise PydanticCustomError(
                "password_whitespace",
                "Password must not contain spaces",
                {"invalid_value": v},
            )
        return v
