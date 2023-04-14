from random import choices
from string import ascii_uppercase

from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

from users.models import CustomUser


def generate_room_code():
    while True:
        code = "".join(choices(ascii_uppercase, k=6))
        if not Room.objects.filter(code=code).exists():
            return code


class Room(models.Model):
    code = models.CharField(max_length=6, unique=True, default=generate_room_code)
    host_id = models.IntegerField()
    max_participants = models.IntegerField(
        validators=[MinValueValidator(2), MaxValueValidator(5)]
    )

    def __str__(self):
        return self.code


class Participant(models.Model):
    score = models.IntegerField(default=0)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    room = models.ForeignKey(
        Room, related_name="participants", on_delete=models.CASCADE
    )
