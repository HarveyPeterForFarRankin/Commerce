from django.urls import path
from .views import CustomAuthToken, CreateUser,  User

urlpatterns = [
    path('login', CustomAuthToken.as_view()),
    path('user/create', CreateUser.as_view()),
    path('user/update', User.as_view())
]