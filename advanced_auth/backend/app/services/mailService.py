from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pydantic import SecretStr, EmailStr
from typing import Dict

from app.templates.mail import get_mail_html


class MailService:
    def __init__(self):
        self.conf = ConnectionConfig(
            MAIL_USERNAME="petilia2002",
            MAIL_PASSWORD=SecretStr("mahxwkgenxucijka"),
            MAIL_FROM="petilia2002@yandex.ru",
            MAIL_PORT=465,
            MAIL_SERVER="smtp.yandex.ru",
            MAIL_STARTTLS=False,
            MAIL_SSL_TLS=True,
            USE_CREDENTIALS=True,
        )

    async def send_activation_mail(self, to: str, link: str) -> Dict[str, str]:
        template = get_mail_html(link)

        message = MessageSchema(
            subject="Account Activation",
            recipients=[to],
            body=template,
            subtype=MessageType.html,
        )

        fm = FastMail(self.conf)
        await fm.send_message(message)
        return {"Message": "The email was sent successfully"}


mailService = MailService()
