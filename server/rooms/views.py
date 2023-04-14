from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from users.utils import Token
from .models import Room, Participant
from .serializers import (
    RoomSerializer,
    GetRoomDataSerializer,
    JoinRoomSerializer,
    LeaveRoomSerializer,
)


class GetRoomData(APIView):
    def get(self, request):
        serializer = GetRoomDataSerializer(data=request.query_params)
        if serializer.is_valid(raise_exception=True):
            room = serializer.validated_data["room"]
            return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)


class CreateRoom(APIView):
    permission_classes = (IsAuthenticated,)

    def get_queryset(self, request):
        self.serializer = RoomSerializer(data=request.data)
        if self.serializer.is_valid(raise_exception=True):
            access_token = request.auth.token
            self.user_id = Token.get_user_id_from_token(access_token)
            return Room.objects.filter(host_id=self.user_id)

    def post(self, request):
        queryset = self.get_queryset(request)
        if queryset.exists():
            room = queryset[0]
            room.max_participants = self.serializer.validated_data["max_participants"]
            room.save(update_fields=["max_participants"])
            Participant.objects.filter(room=room).exclude(user_id=self.user_id).delete()
        else:
            room = Room.objects.create(
                host_id=self.user_id,
                max_participants=self.serializer.validated_data["max_participants"],
            )
            Participant.objects.create(user_id=self.user_id, room=room)
        return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)


class JoinRoom(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request):
        serializer = JoinRoomSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            access_token = request.auth.token
            room = serializer.validated_data["room"]
            user_id = Token.get_user_id_from_token(access_token)
            Participant.objects.create(user_id=user_id, room=room)
            return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)


class LeaveRoom(APIView):
    permission_classes = (IsAuthenticated,)

    def get_queryset(self, request):
        self.serializer = LeaveRoomSerializer(data=request.data)
        if self.serializer.is_valid(raise_exception=True):
            access_token = request.auth.token
            user_id = Token.get_user_id_from_token(access_token)
            return Participant.objects.filter(user_id=user_id)

    def put(self, request):
        queryset = self.get_queryset(request)
        if queryset.exists():
            participant = queryset[0]
            room = self.serializer.validated_data["room"]
            if participant.user.id == room.host_id:
                room.delete()
            else:
                queryset.delete()
            return Response(status=status.HTTP_200_OK)
        return Response({"error": "User not in room"}, status=status.HTTP_404_NOT_FOUND)


class CheckIfInRoom(APIView):
    def get(self, request):
        access_token = request.auth.token
        user_id = Token.get_user_id_from_token(access_token)
        queryset = Participant.objects.filter(user_id=user_id)
        if queryset.exists():
            room = queryset[0].room
            return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
        return Response({"error": "User not in room"}, status=status.HTTP_404_NOT_FOUND)
