from django.urls import path
from . import views

app_name = "quiz"

urlpatterns = [
    path("create-game", views.CreateGame.as_view()),
    path("get-game", views.GetGameState.as_view()),
    path("delete-game", views.DeleteGame.as_view()),
]
