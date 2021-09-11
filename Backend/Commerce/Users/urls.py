from django.urls import path
from .views import CustomAuthToken, CreateUser

urlpatterns = [
    path('login', CustomAuthToken.as_view()),
    path('user/create', CreateUser.as_view())
]