from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from users.utils import Token
from .serializers import GameSerializer, GameRetrieveSerializer


class GameView(APIView):
    permission_classes = (IsAuthenticated,)

    def user_is_host(self, request):
        validated_data = dict(self.serializer.validated_data)
        access_token = request.auth.token
        user_id = Token.get_user_id_from_token(access_token)
        return user_id == validated_data["room"].host_id


class GetGameState(GameView):
    def get(self, request):
        serializer = GameRetrieveSerializer(data=request.query_params)
        if serializer.is_valid(raise_exception=True):
            game = serializer.validated_data["game"]
            return Response(GameSerializer(game).data)


class CreateGame(GameView):
    def post(self, request):
        self.serializer = GameSerializer(data=request.data)
        if self.serializer.is_valid(raise_exception=True):
            if self.user_is_host(request):
                print('GAME SAVED')
                game = self.serializer.save()
                return Response(
                    GameSerializer(game).data, status=status.HTTP_201_CREATED
                )
            return Response(
                {"error": "User is not the host"}, status=status.HTTP_404_NOT_FOUND
            )

class DeleteGame(GameView):
    def delete(self, request):
        serializer = GameRetrieveSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            game = serializer.validated_data['game']
            game.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

