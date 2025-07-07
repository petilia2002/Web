from fastapi import Request, HTTPException
from pydantic import ValidationError
from app.schemas.schemas import RoleBase


async def parse_role(request: Request) -> RoleBase:
    content_type = request.headers.get("Content-Type", "")

    # Обработка JSON-запроса
    if "application/json" in content_type:
        try:
            json_data = await request.json()
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid JSON body")

        try:
            data = RoleBase(**json_data)
        except ValidationError as e:
            raise HTTPException(
                status_code=400, detail=f"Validation error: {e.errors()}"
            )
        return data

    # Обработка multipart/form-data
    elif (
        "multipart/form-data" in content_type
        or "application/x-www-form-urlencoded" in content_type
    ):
        try:
            form = await request.form()
            data = RoleBase(**form)
        except KeyError as e:
            raise HTTPException(status_code=400, detail=f"Missing form field: {str(e)}")
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid multipart/form-data")

        return data

    # Неподдерживаемый Content-Type
    else:
        raise HTTPException(status_code=415, detail="Unsupported Content-Type")
