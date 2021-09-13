from django.urls import path
from .views import CustomAuthToken, CreateUser,  User, CheckTokenView, UserGet

urlpatterns = [
    path('login', CustomAuthToken.as_view()),
    path('user/create', CreateUser.as_view()),
    path('user/get', UserGet.as_view()),
    path('user/update', User.as_view()),
    path('user/check/<str:code>', CheckTokenView.as_view())
]