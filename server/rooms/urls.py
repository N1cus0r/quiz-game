from django.urls import path

from . import views

app_name = "rooms"

urlpatterns = [
    path("", views.GetRoomData.as_view()),
    path("create-room", views.CreateRoom.as_view()),
    path("join-room", views.JoinRoom.as_view()),
    path("leave-room", views.LeaveRoom.as_view()),
    path("check-if-in-room", views.CheckIfInRoom.as_view()),
]
