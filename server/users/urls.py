from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from .views import CustomTokenObtainPairView, CreateUser


app_name = "users"

urlpatterns = [
    path("token", CustomTokenObtainPairView.as_view()),
    path("token/refresh", TokenRefreshView.as_view()),
    path("register", CreateUser.as_view()),
]
