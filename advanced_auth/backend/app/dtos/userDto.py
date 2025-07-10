from typing import Dict, Any

from app.models.models import User


class UserDto:
    def __init__(self, model: User):
        self.id = model.id
        self.email = model.email
        self.is_activated = model.is_activated

    @property
    def to_dict(self) -> Dict[str, Any]:
        return {"id": self.id, "email": self.email, "is_activated": self.is_activated}
