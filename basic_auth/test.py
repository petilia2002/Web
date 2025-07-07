from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


hashed = hash_password("mysecretpassword")
print(hashed)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


is_valid = verify_password("mysecretpassword", hashed)
print(is_valid)  # True
