from fastapi import Request
from fastapi.responses import JSONResponse

from app.exceptions.apiError import ApiError


async def global_exception_handler(request: Request, exc: Exception):
    if isinstance(exc, ApiError):
        return JSONResponse(
            status_code=exc.status_code,
            content={"message": exc.message, "errors": exc.errors},
        )
    else:
        return JSONResponse(
            status_code=500,
            content={"error": "Something went wrong"},
        )
