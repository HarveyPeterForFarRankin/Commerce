from rest_framework import serializers
from .models import Order, OrderItem, Product
from Users.serializers import UserSerializer

class ProductSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    title = serializers.CharField()

    class Meta:
        model = Product
        fields = ('title', 'id')

class OrdersSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    owner = UserSerializer
    created_at = serializers.DateTimeField()
    status = serializers.CharField()

    class Meta:
        model = Order
        fields = "__all__"

class OrdersItemSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = OrderItem
        fields = "__all__"