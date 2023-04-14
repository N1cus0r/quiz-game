from django.urls import path

from . import views

app_name = "rooms"

urlpatterns = [
    path("", views.GetRoomData.as_view(), name='get-room-data'),
    path("create-room", views.CreateRoom.as_view(), name='create-room'),
    path("join-room", views.JoinRoom.as_view(), 'join-room'),
    path("leave-room", views.LeaveRoom.as_view(), 'leave-room'),
    path("check-if-in-room", views.CheckIfInRoom.as_view(), 'check-if-in-room'),
]
