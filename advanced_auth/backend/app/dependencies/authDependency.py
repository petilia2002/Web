from fastapi import Request

from app.exceptions.apiError import ApiError
from app.services.tokenService import TokenService


async def require_auth(request: Request):
    header = request.headers.get("Authorization")

    if not header or not header.startswith("Bearer"):
        raise ApiError.UnauthorizationError(
            message="The authorization header is missing or contains an access token in the wrong format"
        )

    terms = header.split(" ")
    if len(terms) != 2:
        raise ApiError.UnauthorizationError(
            message="The authorization token is missing"
        )

    token = terms[-1]
    payload = TokenService.verify_access_token(token)
    if not payload:
        raise ApiError.UnauthorizationError(message="Invalid authorization token")
    return payload
