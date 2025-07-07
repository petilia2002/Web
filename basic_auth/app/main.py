from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.routers import authRouter, roleRouter
from app.db.database import async_engine
from app.models.models import Base


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

# Включаем асинхронные роутеры
app.include_router(authRouter.router, prefix="/auth")
app.include_router(roleRouter.router, prefix="/api")


# Асинхронный корневой эндпоинт
@app.get("/")
async def root():
    return {"Message": "Welcome to my FastAPI application!"}
