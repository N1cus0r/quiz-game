from rest_framework import serializers

from users.serializers import CustomUserSerializer
from .models import Room, Game, GameType, Question, Participant


# class ParticipantSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Participant
#         read_only_fields = ("id", "score", "room")
#         fields = ("id", "nickname", "score", "room")



# class QuestionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Question
#         fields = ("game_type", "image", "text", "answer")
#         read_only_fields = ("game_type", "image", "text", "answer")


# class GameSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Game
#         fields = ("type", "questions", "room")
#         read_only_fields = "questions"


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
    id = serializers.ModelField(model_field=Room()._meta.get_field("id"))

    def validate(self, attrs):
        if not Room.objects.filter(id=attrs["id"]).exists():
            raise serializers.ValidationError(
                detail="Room with provided id does not exist"
            )

        return attrs
