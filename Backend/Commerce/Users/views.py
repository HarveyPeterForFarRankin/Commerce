from django.db.models.query import QuerySet
from django.http import request
from django.shortcuts import render
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import generics, status
from .models import CustomUser
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer, TokenSerializer
from .models import CustomUser\


class CheckTokenView(generics.RetrieveAPIView):
    queryset = Token.objects.all()
    permission_classes = [AllowAny,]
    serializer_class = TokenSerializer
    lookup_url_kwarg = "code"
    lookup_field = 'key'


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            "user": {
                'user_id': user.pk,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name
            }            
        })

class CreateUser(APIView):
    """
    basic endpoint to create user with email and password
    """

    permission_classes = [AllowAny,]

    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        if username and password:
            user, created = CustomUser.objects.get_or_create(email=username)
            if created:
                user.set_password(password)
                user.save() 
                return Response({'message':'User created'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'User could not be created'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message': 'missing username or password'}, status=status.HTTP_400_BAD_REQUEST)

class UserGet(generics.RetrieveUpdateAPIView):
    queryset = CustomUser.objects.all()

    def get(self, request):
        instance = CustomUser.objects.get(id=request.user.id)
        print(instance)
        serializer = UserSerializer(instance, partial=True)
        return Response(serializer.data)
       

class User(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()

    """
    basic endpoint to update user
    """

    def put(self, request):
        instance = CustomUser.objects.get(id=request.user.id)
        serializer = UserSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)