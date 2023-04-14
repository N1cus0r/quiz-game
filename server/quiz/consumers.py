import json
from django.db.models import F
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from rooms.models import Participant
from quiz.models import Game, CurrentQuestion
from quiz.serializers import QuestionSerializer


class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.game_id = self.scope["url_route"]["kwargs"]["game_id"]
        self.group_name = "game_" + self.game_id

        await self.channel_layer.group_add(self.group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        jsonData = json.loads(text_data)["data"]
        user_id = jsonData["user_id"]

        await self.add_score(user_id)

        if not await self.set_next_question():
            await self.delete_game()
            await self.channel_layer.group_send(
                self.group_name,
                {
                    "type": "game_over",
                },
            )
        else:
            await self.channel_layer.group_send(
                self.group_name,
                {
                    "type": "next_question",
                },
            )

    async def game_over(self, *args):
        await self.send(text_data=json.dumps({"event": "game_over"}))

    async def next_question(self, *args):
        await self.send(text_data=json.dumps({"event": "next_question"}))

    @database_sync_to_async
    def add_score(self, user_id):
        Participant.objects.filter(user_id=user_id).update(score=F("score") + 1)

    @database_sync_to_async
    def set_next_question(self):
        questions = Game.objects.get(pk=self.game_id).questions.all()
        current_question = CurrentQuestion.objects.get(game_id=self.game_id)

        if not current_question.index < 9:
            return False

        current_question.index += 1
        current_question.question = questions[current_question.index]
        current_question.save()

        return True

    @database_sync_to_async
    def delete_game(self):
        Game.objects.filter(id=self.game_id).delete()
