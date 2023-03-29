from random import choices
from string import ascii_uppercase


from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.postgres.fields import ArrayField


def generate_room_code():
    while True:
        code = "".join(choices(ascii_uppercase, k=6))
        if not Room.objects.filter(code=code).exists():
            return code


class Room(models.Model):
    code = models.CharField(max_length=6, unique=True, default=generate_room_code)
    host_id = models.CharField(max_length=50, unique=True)
    max_participants = models.IntegerField(
        validators=[MinValueValidator(2), MaxValueValidator(5)]
    )
    leaderboards_ids = ArrayField(
        base_field=models.CharField(max_length=50, unique=True), default=list 
    )

    def __str__(self):
        return self.code


class Question(models.Model):
    image = models.CharField(max_length=250)
    text = models.CharField(max_length=100)
    answer = models.CharField(max_length=50)

class Game(models.Model):
    type = models.CharField(max_length=2)
    questions = models.ForeignKey(Question, related_name='game', on_delete=models.CASCADE)
    room = models.OneToOneField(Room, related_name='game', on_delete=models.CASCADE)