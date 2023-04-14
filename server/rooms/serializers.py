from rest_framework import serializers

from users.serializers import CustomUserSerializer
from .models import Room, Participant


class ParticipantSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(many=False, read_only=True)

    class Meta:
        model = Participant
        fields = (
            "score",
            "user",
        )


class RoomSerializer(serializers.ModelSerializer):
    participants = ParticipantSerializer(many=True, read_only=True)

    class Meta:
        model = Room
        fields = ("id", "code", "host_id", "max_participants", "participants")
        read_only_fields = ("id", "code", "host_id")


class RoomOperationSerializer(serializers.Serializer):
    code = serializers.CharField(min_length=6, max_length=6)

    def validate(self, attrs):
        queryset = Room.objects.filter(code=attrs["code"])
        if not queryset.exists():
            raise serializers.ValidationError("Invalid room code")

        room = queryset[0]
        attrs["room"] = room

        return attrs


class GetRoomDataSerializer(RoomOperationSerializer):
    pass


class JoinRoomSerializer(RoomOperationSerializer):
    code = serializers.CharField(min_length=6, max_length=6)

    def validate(self, attrs):
        room = super().validate(attrs)["room"]
        if Participant.objects.filter(room=room).count() == room.max_participants:
            raise serializers.ValidationError("Room is full")

        return attrs


class LeaveRoomSerializer(RoomOperationSerializer):
    pass
