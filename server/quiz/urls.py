from django.urls import path
from . import views

app_name = "quiz"

urlpatterns = [
    path("create-room", views.CreateRoom.as_view()),
    path("join-room", views.JoinRoom.as_view()),
    path("leave-room", views.LeaveRoom.as_view()),
]
