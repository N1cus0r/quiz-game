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
    host_id = models.CharField(max_length=50, unique=True)
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


class GameType(models.TextChoices):
    GUESS_CAPITAL = "GC", "Guess Capital"
    GUESS_FLAG = "GF", "Guess Flag"

    def __str__(self):
        return self.game_type + " " + self.text


class Question(models.Model):
    game_type = models.CharField(max_length=2, choices=GameType.choices)
    image = models.CharField(max_length=250)
    text = models.CharField(max_length=100)
    answer = models.CharField(max_length=50)


class GameManager(models.Manager):
    def create(self, **data):
        game = super().create(**data)
        questions = Question.objects.filter(game_type=data["type"]).order_by("?")[:10]
        game.questions.set(questions)


class Game(models.Model):
    type = models.CharField(max_length=2, choices=GameType.choices)
    room = models.OneToOneField(Room, related_name="game", on_delete=models.CASCADE)
    questions = models.ManyToManyField(Question)

    objects = GameManager()

    def __str__(self) -> str:
        return self.type
