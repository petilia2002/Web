from app.models.models import User
from app.schemas.schemas import UserResponse

user = User(
    id=1, email="petnat2008@yandex.ru", password="1234", activation_link="zalupa"
)
print(user)

user = UserResponse.model_validate(user)
print(user)
