import pytest
import random
from faker import Faker

from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken

from users.models import CustomUser
from rooms.models import Room, Participant
from quiz.models import Game, GameType, Question


@pytest.fixture(scope="session")
def fake():
    return Faker()


@pytest.fixture(scope="session")
def client():
    return APIClient()


@pytest.fixture()
def user():
    return CustomUser.objects.create_user(
        username="test user", email="test@mail.ru", password="test_test"
    )


@pytest.fixture
def authenticated_user(user):
    access_token = RefreshToken.for_user(user).access_token
    return {"access_token": access_token, "user": user}


@pytest.fixture
def room(fake, user):
    room = Room.objects.create(
        host_id=user.pk, max_participants=fake.pyint(min_value=2, max_value=5)
    )
    Participant.objects.create(room=room, user=user)

    return room


@pytest.fixture
def game_questions(fake):
    return [
        Question.objects.create(
            game_type=random.choice([GameType.GUESS_CAPITAL, GameType.GUESS_FLAG]),
            image=fake.image_url(),
            text=fake.sentence(),
            answer=fake.word(),
        )
        for _ in range(10)
    ]


@pytest.fixture
def game(room, game_questions):
    return Game.objects.create(
        room=room, type=random.choice([GameType.GUESS_CAPITAL, GameType.GUESS_FLAG])
    )


@pytest.fixture
def authenticated_helper_user(fake):
    user = CustomUser.objects.create_user(
        username=fake.first_name(), email=fake.email(), password=fake.password()
    )
    access_token = RefreshToken.for_user(user).access_token
    return {"access_token": access_token, "user": user}
