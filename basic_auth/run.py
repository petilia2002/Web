import uvicorn
from app.core.config import HOST, PORT, DEBUG

if __name__ == "__main__":
    uvicorn.run("app.main:app", host=HOST, port=PORT, reload=DEBUG)
