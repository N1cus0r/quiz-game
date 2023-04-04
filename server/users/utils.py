from jwt import decode

from core.settings import SECRET_KEY
from .models import CustomUser


class Token:
    @staticmethod
    def get_user_id_from_token(access_token):
        return decode(access_token, SECRET_KEY, algorithms=["HS256"])["user_id"]


