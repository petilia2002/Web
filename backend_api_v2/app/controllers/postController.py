from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.postService import PostService
from app.exceptions import ItemNotFound
from app.utils.request_parser import RequestData
from app.schemas.post import PostBase
from pydantic import ValidationError


class PostController:
    @staticmethod
    async def get_all_posts(db: AsyncSession):
        try:
            return await PostService.get_all_posts(db)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def get_post_by_id(db: AsyncSession, post_id: int):
        try:
            return await PostService.get_post_by_id(db, post_id)
        except ItemNotFound as e:
            raise HTTPException(status_code=404, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def create_post(db: AsyncSession, req: RequestData):
        try:
            return await PostService.create_post(
                db, PostBase(**req.body), req.files.get("picture")
            )
        except ValueError as e:
            messages = [err["msg"] for err in e.errors()]
            raise HTTPException(status_code=400, detail=messages)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def delete_post(db: AsyncSession, post_id: int):
        try:
            return await PostService.delete_post(db, post_id)
        except ItemNotFound as e:
            raise HTTPException(status_code=404, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def update_post(db: AsyncSession, req: RequestData):
        try:
            return await PostService.update_post(
                db, PostBase(**req.body), req.files.get("picture")
            )
        except ItemNotFound as e:
            raise HTTPException(status_code=404, detail=str(e))
        except ValueError as e:
            messages = [err["msg"] for err in e.errors()]
            raise HTTPException(status_code=400, detail=messages)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
