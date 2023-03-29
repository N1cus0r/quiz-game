from django.urls import path
from . import views

app_name = "quiz"

urlpatterns = [
    path("create-room", views.CreateRoom.as_view())
]
