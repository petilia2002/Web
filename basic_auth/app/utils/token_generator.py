import jwt
from datetime import datetime, timedelta, timezone
from app.core.config import SECRET_KEY
from typing import List, Any


def payload_proprocessing(payload, time_fields):
    # Преобразование каждого временного поля
    for field in time_fields:
        if field in payload:
            # Преобразуем Unix timestamp в datetime с UTC временной зоной
            payload[field] = datetime.fromtimestamp(payload[field], tz=timezone.utc)
    return payload


def generate_access_token(id: str, username: str, roles: List[str]) -> str:
    payload = {
        "id": id,
        "username": username,
        "roles": roles,
        "iat": datetime.now(timezone.utc),
        "exp": datetime.now(timezone.utc) + timedelta(days=1, hours=1),
    }
    return jwt.encode(payload=payload, key=SECRET_KEY, algorithm="HS256")


def verify_access_token(token: str) -> dict[str, Any]:
    payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    payload = payload_proprocessing(payload)
    return payload
