from rest_framework import serializers
from .models import Room


class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ("max_participants", "game_type")


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        read_only_fields = ("host_id", "leaderboards_ids")
        fields = (
            "code",
            "host_id",
            "max_participants",
            "leaderboards_ids",
            "game_type",
        )
