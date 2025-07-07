from fastapi import Request, HTTPException
from pydantic import ValidationError
from app.schemas.schemas import UserBase


async def parse_user(request: Request) -> UserBase:
    content_type = request.headers.get("Content-Type", "")

    # Обработка JSON-запроса
    if "application/json" in content_type:
        try:
            json_data = await request.json()
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid JSON body")

        try:
            data = UserBase(**json_data)
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))
        return data

    # Обработка multipart/form-data
    elif (
        "multipart/form-data" in content_type
        or "application/x-www-form-urlencoded" in content_type
    ):
        try:
            form = await request.form()
            data = UserBase(**form)
        except KeyError as e:
            raise HTTPException(status_code=400, detail=f"Missing form field: {str(e)}")
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid multipart/form-data")

        return data

    # Неподдерживаемый Content-Type
    else:
        raise HTTPException(status_code=415, detail="Unsupported Content-Type")
