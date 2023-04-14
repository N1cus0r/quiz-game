from django.urls import path
from . import views

app_name = "quiz"

urlpatterns = [
    path("get-game", views.GetGameState.as_view(), name="get-game"),
    path("create-game", views.CreateGame.as_view(), name="create-game"),
    path("delete-game", views.DeleteGame.as_view(), name="delete-game"),
]
