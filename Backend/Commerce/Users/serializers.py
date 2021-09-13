from rest_framework import serializers
from .models import CustomUser
from rest_framework.authtoken.models import Token


class UserSerializer(serializers.Serializer):
    first_name = serializers.CharField()
    id = serializers.ReadOnlyField()
    class Meta:
        model = CustomUser
        fields = "__all__"

class TokenSerializer(serializers.Serializer):
    key = serializers.CharField()
    user = UserSerializer

    class Meta:
        model = Token
        fields = "__all__"
        depth = 2