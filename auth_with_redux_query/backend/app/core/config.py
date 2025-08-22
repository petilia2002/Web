from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./app.db")

JWT_ACCESS_KEY = os.getenv("JWT_ACCESS_KEY", "my_secret_key")
JWT_REFRESH_KEY = os.getenv("JWT_REFRESH_KEY", "my_secret_key")

HOST = os.getenv("HOST", "localhost")
PORT = int(os.getenv("PORT", 5000))
DEBUG = os.getenv("DEBUG", "True").lower() == "true"

SMTP_HOST = os.getenv("SMTP_HOST", "localhost")
SMTP_PORT = os.getenv("SMTP_PORT", "5000")
SMTP_MAIL = os.getenv("SMTP_MAIL", "something@gmail.com")
SMTP_USER = os.getenv("SMTP_USER", "something")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "1234")

API_URL = os.getenv("API_URL", "http://localhost:5874")
CLIENT_URL = os.getenv("CLIENT_URL", "http://localhost:5874")
