from rest_framework import serializers
from .models import Order, OrderItem, Product, Discount
from Users.serializers import UserSerializer

class ProductSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    title = serializers.CharField()
    inventory = serializers.IntegerField()
    cost = serializers.FloatField()
    category = serializers.CharField()

    class Meta:
        model = Product
        fields = "__all__"

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
        depth = 1

class DiscountSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    key = serializers.UUIDField()
    percentage = serializers.IntegerField()

    class Meta:
        model = Discount
        fields = "__all__"