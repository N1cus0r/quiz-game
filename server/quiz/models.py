from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

from rooms.models import Room


class GameType(models.TextChoices):
    GUESS_CAPITAL = "GC", "Guess Capital"
    GUESS_FLAG = "GF", "Guess Flag"


class Question(models.Model):
    game_type = models.CharField(max_length=2, choices=GameType.choices)
    image = models.CharField(max_length=250)
    text = models.CharField(max_length=100)
    answer = models.CharField(max_length=50)


class GameManager(models.Manager):
    def create(self, **data):
        questions = Question.objects.filter(game_type=data["type"]).order_by("?")[:10]
        game = super().create(**data)
        game.questions.set(questions)
        CurrentQuestion.objects.create(question=questions[0], game=game)

        return game


class Game(models.Model):
    type = models.CharField(max_length=2, choices=GameType.choices)
    room = models.OneToOneField(Room, related_name="game", on_delete=models.CASCADE)
    questions = models.ManyToManyField(Question)

    objects = GameManager()

    def __str__(self):
        return self.type


class CurrentQuestion(models.Model):
    index = models.IntegerField(
        default=0, validators=[MinValueValidator(0), MaxValueValidator(9)]
    )
    question = models.OneToOneField(Question, on_delete=models.CASCADE)
    game = models.OneToOneField(
        Game, related_name="current_question", on_delete=models.CASCADE
    )
