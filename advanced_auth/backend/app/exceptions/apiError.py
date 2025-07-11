from typing import List, Any


class ApiError(Exception):
    def __init__(self, status_code: int, message: str, errors: List[Any] = []):
        super().__init__(message)
        self.status_code = status_code
        self.message = message
        self.errors = errors

    @staticmethod
    def UnauthorizationError(message: str, errors: List[Any] = []):
        return ApiError(status_code=401, message=message, errors=errors)

    @staticmethod
    def BadRequest(message: str, errors: List[Any] = []):
        return ApiError(status_code=400, message=message, errors=errors)
