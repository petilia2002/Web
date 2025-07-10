from sqlalchemy import Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship, Mapped, mapped_column, DeclarativeBase


# Базовый класс для ORM
class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(30), nullable=False)
    activation_link: Mapped[str] = mapped_column(String(512), nullable=False)
    is_activated: Mapped[bool] = mapped_column(Boolean, nullable=True, default=False)

    # Связь один к одному
    token: Mapped["Token"] = relationship(
        "Token", back_populates="user", uselist=False, cascade="all, delete-orphan"
    )


class Token(Base):
    __tablename__ = "tokens"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    resfresh_token: Mapped[str] = mapped_column(
        String(512), unique=True, nullable=False
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False
    )

    # Обратная связь
    user: Mapped["User"] = relationship("User", back_populates="token")
