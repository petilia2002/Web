from fastapi import Request, HTTPException
import jwt

from app.core.config import SECRET_KEY
from app.utils.token_generator import payload_proprocessing


async def require_auth(request: Request) -> dict:
    token = request.headers.get("Authorization")

    if not token or not token.startswith("Bearer"):
        raise HTTPException(
            status_code=401, detail="The authorization token is missing"
        )

    token = token.split(" ")[1]

    try:
        payload = jwt.decode(jwt=token, key=SECRET_KEY, algorithms=["HS256"])
        payload = payload_proprocessing(payload, ["iat", "exp"])
        return payload
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")
