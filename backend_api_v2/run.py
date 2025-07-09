import uvicorn
from app.core.config import DEBUG

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="localhost", port=5000, reload=DEBUG)
