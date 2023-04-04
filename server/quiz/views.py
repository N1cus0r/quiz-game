from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from users.utils import Token
from .serializers import RoomSerializer, RoomOperationSerializer
from .models import Room, Participant


class CreateRoom(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            access_token = request.auth.token
            user_id = Token.get_user_id_from_token(access_token)
            queryset = Room.objects.filter(host_id=user_id)
            if queryset.exists():
                room = queryset[0]
                room.max_participants = serializer.validated_data["max_participants"]
                room.save(update_fields=["max_participants"])
            else:
                room = Room.objects.create(
                    host_id=user_id,
                    max_participants=serializer.validated_data["max_participants"],
                )
                Participant.objects.create(user_id=user_id, room=room)
            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)


class JoinRoom(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request):
        serializer = RoomOperationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            access_token = request.auth.token
            room_id = serializer.validated_data["id"]
            user_id = Token.get_user_id_from_token(access_token)
            Participant.objects.create(user_id=user_id, room_id=room_id)
            room = Room.objects.get(pk=room_id)
            return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)


class LeaveRoom(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request):
        access_token = request.auth.token
        user_id = Token.get_user_id_from_token(access_token)
        queryset = Participant.objects.filter(user_id=user_id)
        if queryset.exists():
            queryset.delete()
            return Response(status=status.HTTP_200_OK)
        return Response({"error": "User not in room"}, status=status.HTTP_404_NOT_FOUND)
