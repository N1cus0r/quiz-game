from rest_framework import serializers

from .models import Question, CurrentQuestion, Game, Room


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ("image", "text", "answer")
        read_only_fields = ("image", "text", "answer")


class CurrentQuestionSerializer(serializers.ModelSerializer):
    question = QuestionSerializer(many=False, read_only=True)

    class Meta:
        model = CurrentQuestion
        fields = ("question",)


class GameSerializer(serializers.ModelSerializer):
    room = serializers.PrimaryKeyRelatedField(
        queryset=Room.objects.all(), write_only=True
    )
    current_question = CurrentQuestionSerializer(many=False, read_only=True)

    class Meta:
        model = Game
        fields = ("id", "type", "room", "current_question")
        extra_kwargs = {"type": {"write_only": True}}


class GameRetrieveSerializer(serializers.Serializer):
    id = serializers.IntegerField()

    def validate(self, attrs):
        game_id = attrs["id"]
        queryset = Game.objects.filter(pk=game_id)
        if not queryset.exists():
            raise serializers.ValidationError("Game with provided id not found")

        attrs["game"] = queryset[0]

        return attrs
