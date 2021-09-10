from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import generics
from .models import Product, Order, OrderItem
from .serializers import ProductSerializer, OrdersSerializer, OrdersItemSerializer
from rest_framework.permissions import AllowAny
# Create your views here.

class ProductListView(generics.ListCreateAPIView):
    """
    returns all products

    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny,]


class OrdersListView(generics.ListCreateAPIView):
    """"
    returns all orders (user_id)

    """
    serializer_class = OrdersSerializer
    
    def get_queryset(self):
        current_user = self.request.user
        return Order.objects.filter(owner=current_user)

class AddOrderDetail(generics.CreateAPIView):
    """
    create order (cart)

    """
    serializer_class = OrdersSerializer
    queryset = Order.objects.all()


    def create(self, request, *args, **kwargs):
        """
        create order with user id coming from middleware
        """
        new_response = self.request.data
        new_response['owner'] = self.request.user.id
        response = super(AddOrderDetail, self).create(request, *args, **kwargs)
        return response


class OrderDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    update, delete and get order

    """ 
    serializer_class = OrdersSerializer
    queryset = Order.objects.all()

class OrdersItemsListView(generics.ListAPIView):
    """"
    returns all orders (user_id)

    """
    serializer_class = OrdersItemSerializer
    queryset = OrderItem.objects.all()
    lookup_url_kwarg = "pk"
    
    def get_queryset(self):
        """
        get all items within a cart
        """
        order_id = self.kwargs.get(self.lookup_url_kwarg)
        print(order_id)
        return OrderItem.objects.filter(order=order_id)

class OrderItemDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    update, delete and get order

    """ 
    serializer_class = OrdersItemSerializer
    queryset = OrderItem.objects.all()
