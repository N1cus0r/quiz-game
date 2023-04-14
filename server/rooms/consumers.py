import json

from channels.generic.websocket import AsyncWebsocketConsumer


class RoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = self.scope["url_route"]["kwargs"]["room_code"]

        await self.channel_layer.group_add(self.group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        jsonData = json.loads(text_data)
        await self.channel_layer.group_send(
            self.group_name, {"type": "room_event", "data": jsonData["data"]}
        )

    async def room_event(self, event):
        data = event["data"]
        await self.send(text_data=json.dumps({"data": data}))
