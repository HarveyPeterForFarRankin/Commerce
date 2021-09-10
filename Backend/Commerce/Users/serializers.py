from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.Serializer):

    class Meta:
        model = CustomUser