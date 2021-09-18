from django.contrib.auth.models import User
from django.db.models.query import QuerySet
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Product, Order, OrderItem, Discount, Review
from .serializers import ProductSerializer, OrdersSerializer, OrdersItemSerializer, DiscountSerializer, ReviewSerializer
from rest_framework.permissions import AllowAny
from .util import has_enough_inventory
import json
from rest_framework.views import APIView
from Users.models import CustomUser

# PRODUCT

class ProductListView(generics.ListCreateAPIView):
    """
    returns all products
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny,]
    filterset_fields = "__all__"

class ProductRetrieveView(generics.RetrieveAPIView):
    """
    get product detail
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny,]

# ORDER || CURRENT CART

class GetCart(APIView):
    permission_classes = [AllowAny,]
    def get(self, request, user):
        user_obj = CustomUser.objects.get(id=user)
        print(user_obj)
        order = Order.objects.filter(owner=user_obj, status='open')
        serializer = OrdersSerializer(order, many=True)
        if Order.objects.filter(owner=user_obj, status='open').exists():
            print('here')
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print('yass')
            new_order = Order(status='open', owner=user_obj, discount_code='none')
            serializer = OrdersSerializer(new_order)
            new_order.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
            




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
        response = super(AddOrderDetail, self).create(self.request, *args, **kwargs)
        return response

class OrderDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    update, delete and get order
    """ 
    serializer_class = OrdersSerializer
    queryset = Order.objects.all()
    permission_classes = [AllowAny,]

# ITEMS WITHIN ORDER || OR CURRENT CART

class OrdersItemsListView(generics.ListAPIView):
    """"
    returns all orderItems (user_id) within order
    """
    serializer_class = OrdersItemSerializer
    queryset = OrderItem.objects.all()
    lookup_url_kwarg = "pk"
    permission_classes = [AllowAny,]
    
    
    def get_queryset(self):
        """
        get all items within a cart
        """
        order_id = self.kwargs.get(self.lookup_url_kwarg)
        return OrderItem.objects.filter(order=order_id)

class AddOrderItemDetail(APIView):
    permission_classes = [AllowAny,]

    def post(self, request):
        order = Order.objects.get(id=request.data['order'])
        product = Product.objects.get(id=request.data['product'])
        quantity = request.data['quantity']
        orderItem = OrderItem(order=order, product=product, size=request.data['size'], quantity=quantity)
        has_inventory, new_inventory_number = has_enough_inventory(product_query_set=product, quantity_wanted=quantity)
        if has_inventory:
            # update inventory
           product.inventory = new_inventory_number
           product.save()
           orderItem.save();
           return Response({'message': 'saved'}, status=status.HTTP_200_OK)
        else:
            return Response({'error':'not enough inventory'}, status=status.HTTP_400_BAD_REQUEST)


class OrderItemDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    update, delete and get order
    """ 
    serializer_class = OrdersItemSerializer
    queryset = OrderItem.objects.all()
    lookup_url_kwarg = "item_id"
    permission_classes = [AllowAny,]

    def delete(self, request, *args, **kwargs):
      """
      custom method to delete cart item
      """
      item_id = self.kwargs.get(self.lookup_url_kwarg)
      item = OrderItem.objects.get(id=item_id)
      # update product inventory when item within order(cart) is deleted 
      product = Product.objects.get(id=item.product.id)
      product.inventory = product.inventory + item.quantity
      product.save()
      return self.destroy(request, *args, **kwargs)

# DISOCUNT CODES

class Discount(generics.RetrieveAPIView):
    """
    get discount with correct code
    """
    permission_classes = [AllowAny,]
    serializer_class = DiscountSerializer
    queryset = Discount.objects.all()
    lookup_url_kwarg = "code"
    lookup_field = 'key'

# REVIEWS

class ReviewView(generics.ListAPIView):
    """
    list reviews for product
    """

    serializer_class = ReviewSerializer
    queryset = Review.objects.all()
    permission_classes = [AllowAny,]
    lookup_url_kwarg = "pk"

    def get_queryset(self):
        """
        get all items within a cart
        """
        product_id = self.kwargs.get(self.lookup_url_kwarg)
        return Review.objects.filter(product=product_id)


class AddReview(generics.CreateAPIView):
    """
    create review
    """
    serializer_class = ReviewSerializer
    permission_classes = [AllowAny,]
    queryset = Review.objects.all()


    def create(self, request, *args, **kwargs):
        """
        create order with user id coming from middleware
        """
        new_response = self.request.data
        new_response['owner'] = self.request.user.id
        response = super(AddOrderDetail, self).create(new_response, *args, **kwargs)
        return response