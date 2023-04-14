import pytest
from faker import Faker

from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken

from users.models import CustomUser
from rooms.models import Room, Participant


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
def authenticated_helper_user(fake):
    user = CustomUser.objects.create_user(
        username=fake.first_name(), email=fake.email(), password=fake.password()
    )
    access_token = RefreshToken.for_user(user).access_token
    return {"access_token": access_token, "user": user}
