from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Product, Order, OrderItem
from .serializers import ProductSerializer, OrdersSerializer, OrdersItemSerializer
from rest_framework.permissions import AllowAny
from .util import has_enough_inventory
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
    create order (add cart)

    """
    serializer_class = OrdersSerializer
    queryset = Order.objects.all()


    def create(self, request, *args, **kwargs):
        """
        create order with user id coming from middleware
        """
        new_response = self.request.data
        new_response['owner'] = self.request.user.id
        response = super(AddOrderDetail, self).create(new_response, *args, **kwargs)
        return response


class OrderDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    update, delete and get order

    """ 
    serializer_class = OrdersSerializer
    queryset = Order.objects.all()

class OrdersItemsListView(generics.ListAPIView):
    """"
    returns all orderItems (user_id) within order

    """
    serializer_class = OrdersItemSerializer
    queryset = OrderItem.objects.all()
    lookup_url_kwarg = "pk"
    
    def get_queryset(self):
        """
        get all items within a cart
        """
        order_id = self.kwargs.get(self.lookup_url_kwarg)
        return OrderItem.objects.filter(order=order_id)

class AddOrderItemDetail(generics.CreateAPIView):

    serializer_class = OrdersItemSerializer
    queryset = OrderItem.objects.all()

    def create(self, request, *args, **kwargs):
        """
        create order item and in order and remove quantity from product quantity
        """
        product = Product.objects.get(id=self.request.data['product'])
        quantity = self.request.data['quantity']
        has_inventory, new_inventory_number = has_enough_inventory(product_query_set=product, quantity_wanted=quantity)
        if has_inventory:
            # update inventory
            product.inventory = new_inventory_number
            product.save()
            response = super(AddOrderItemDetail, self).create(request, *args, **kwargs)
            return response
        else:
            return Response({'error':'not enough inventory'}, status=status.HTTP_400_BAD_REQUEST)

class OrderItemDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    update, delete and get order

    """ 
    serializer_class = OrdersItemSerializer
    queryset = OrderItem.objects.all()
