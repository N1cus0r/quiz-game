from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import RoomSerializer
from .models import Room


class CreateRoom(APIView):
    def post(self, request):
        if not self.request.session.exists(self.request.session.session_key):
            print('session created')
            self.request.session.create()
            
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            max_participants = request.data.get("max_participants")
            game_type = request.data.get("game_type")
            host_id = request.session.session_key
            queryset = Room.objects.filter(host_id=host_id)

            if queryset.exists():
                room = queryset[0]
                room.max_participants = max_participants
                room.game_type = game_type
                room.save(update_fields=["max_participants", "game_type"])
                return Response(
                    RoomSerializer(room).data, status=status.HTTP_201_CREATED
                )
            else:
                room = Room.objects.create(
                    host_id=request.session.session_key,
                    max_participants=max_participants,
                    game_type=game_type,
                )
                return Response(RoomSerializer(room).data)


# class TestView(APIView):
#     def get(self, request):

#         session = self.request.session

#         session['count'] = int(session.get('count', 0)) + 1

#         return(Response({'count': self.request.session["count"]}))
