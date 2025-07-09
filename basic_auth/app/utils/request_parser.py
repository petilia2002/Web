from fastapi import Request, HTTPException, UploadFile
from typing import Dict, Any
from typing import Optional


class RequestData:
    def __init__(self, data: Dict[str, Any], picture: Optional[UploadFile] = None):
        self.data = data
        self.picture = picture


async def parse_request(request: Request) -> RequestData:
    content_type = request.headers.get("Content-Type", "")

    # Обработка JSON-запроса
    if "application/json" in content_type:
        try:
            json_data = await request.json()
        except ValueError as e:
            raise HTTPException(
                status_code=400, detail=f"Validation error: {e.errors()}"
            )
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid JSON body")

        return RequestData(data=json_data, picture=None)

    # Обработка multipart/form-data
    elif "multipart/form-data" in content_type:
        try:
            form_data = await request.form()
        except KeyError as e:
            raise HTTPException(status_code=400, detail=f"Missing form field: {str(e)}")
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid multipart/form-data")

        picture = form_data.get("picture")  # UploadFile | None
        return RequestData(
            data={k: v for k, v in form_data.items() if not hasattr(v, "filename")},
            picture=picture,
        )

    elif "application/x-www-form-urlencoded" in content_type:
        try:
            form_data = await request.form()
        except ValueError as e:
            raise HTTPException(
                status_code=400, detail=f"Validation error: {e.errors()}"
            )
        except KeyError as e:
            raise HTTPException(status_code=400, detail=f"Missing form field: {str(e)}")
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid multipart/form-data")
        return RequestData(data=form_data, picture=picture)

    # Неподдерживаемый Content-Type
    else:
        raise HTTPException(status_code=415, detail="Unsupported Content-Type")
