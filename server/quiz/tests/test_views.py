import pytest
import random

from django.urls import reverse

from quiz.models import Game


@pytest.mark.django_db
def test_get_game_view(client, authenticated_user, game, game_questions):
    client.credentials(
        HTTP_AUTHORIZATION="Bearer " + str(authenticated_user["access_token"])
    )

    response = client.get(path=reverse("quiz:get-game"), data={"id": game.pk})

    assert response.status_code == 200


@pytest.mark.django_db
def test_create_game_view(client, authenticated_user, room, game_questions):
    client.credentials(
        HTTP_AUTHORIZATION="Bearer " + str(authenticated_user["access_token"])
    )

    response = client.post(
        path=reverse("quiz:create-game"),
        data={"type": random.choice(("GC", "GF")), "room": room.id},
    )

    assert response.status_code == 201


@pytest.mark.django_db
def test_delete_game_view(client, authenticated_user, game):
    client.credentials(
        HTTP_AUTHORIZATION="Bearer " + str(authenticated_user["access_token"])
    )

    response = client.delete(path=reverse("quiz:delete-game"), data={"id": game.pk})

    assert response.status_code == 204

    assert Game.objects.count() == 0
