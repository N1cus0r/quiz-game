import pytest

from django.urls import reverse
from django.forms.models import model_to_dict

from rooms.models import Participant


@pytest.mark.django_db
def test_get_room_data_view(client, authenticated_user, room):
    client.credentials(
        HTTP_AUTHORIZATION="Bearer " + str(authenticated_user["access_token"])
    )

    response = client.get(path=reverse("rooms:get-room-data"), data={"code": room.code})

    assert all(
        response.json()[key] == value
        for index, (key, value) in enumerate(model_to_dict(room).items())
    )

    assert response.status_code == 200


@pytest.mark.django_db
def test_create_room_view(client, authenticated_user, fake):
    client.credentials(
        HTTP_AUTHORIZATION="Bearer " + str(authenticated_user["access_token"])
    )

    room_form_data = {"max_participants": fake.pyint(min_value=2, max_value=5)}

    response = client.post(reverse("rooms:create-room"), data=room_form_data)

    roomJson = response.json()

    assert response.status_code == 201

    assert roomJson["host_id"] == authenticated_user["user"].pk

    assert len(roomJson["participants"]) == 1

    assert Participant.objects.count() == 1


@pytest.mark.django_db
def test_join_and_leave_room_view(client, authenticated_helper_user, room):
    client.credentials(
        HTTP_AUTHORIZATION="Bearer " + str(authenticated_helper_user["access_token"])
    )

    join_room_response = client.put(
        path=reverse("rooms:join-room"), data={"code": room.code}
    )

    join_room_json = join_room_response.json()

    assert join_room_response.status_code == 200

    assert len(join_room_json["participants"]) == 2

    assert Participant.objects.count() == 2

    client.put(path=reverse("rooms:leave-room"), data={"code": room.code})

    assert Participant.objects.count() == 1


@pytest.mark.django_db
def test_user_in_room_view(client, authenticated_user, authenticated_helper_user, room):
    client.credentials(
        HTTP_AUTHORIZATION="Bearer " + str(authenticated_user["access_token"])
    )

    user_in_room_response = client.get(
        path=reverse("rooms:check-if-in-room"), data={"code": room.code}
    )

    assert user_in_room_response.status_code == 200

    client.credentials(
        HTTP_AUTHORIZATION="Bearer " + str(authenticated_helper_user["access_token"])
    )

    user_not_in_room_response = client.get(
        path=reverse("rooms:check-if-in-room"), data={"code": room.code}
    )

    assert user_not_in_room_response.status_code == 404
