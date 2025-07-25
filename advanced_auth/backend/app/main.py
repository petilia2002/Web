from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.routers import userRouter
from app.db.database import async_engine
from app.models.models import Base
from app.middlewares.errorHandlingMiddleware import ErrorHandlingMiddleware
from app.exceptions.apiError import ApiError


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Код, выполняемый при запуске приложения
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    # Код, выполняемый при остановке приложения (опционально)
    await async_engine.dispose()


app = FastAPI(
    title="My FastAPI App",
    description="A sample FastAPI application with well-organized structure",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(ErrorHandlingMiddleware)

# Включаем асинхронные роутеры
app.include_router(userRouter.router, prefix="/auth")


# Асинхронный корневой эндпоинт
@app.get("/")
async def root():
    return {"Message": "Welcome to my FastAPI application!"}
