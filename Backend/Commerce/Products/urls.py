
from django.contrib import admin
from django.urls import path
from .views import ProductListView, OrdersListView, OrderDetail, AddOrderDetail, OrdersItemsListView, AddOrderItemDetail, OrderItemDetail, Discount, ProductRetrieveView, ReviewView, AddReview, GetCart

urlpatterns = [
    path('products', ProductListView.as_view()),
    path('products/<int:pk>', ProductRetrieveView.as_view()),
    path('orders/get/<str:user>', GetCart.as_view()),
    path('orders', OrdersListView.as_view()),
    path('orders/<int:pk>', OrderDetail.as_view()),
    path('orders/create', AddOrderDetail.as_view()),
    path('orders/items/create', AddOrderItemDetail.as_view()),
    path('orders/items/<int:pk>', OrdersItemsListView.as_view()),
    path('orders/items/update/<int:item_id>', OrderItemDetail.as_view()),
    path('discount/<str:code>', Discount.as_view()),
    path('reviews/<int:pk>', ReviewView.as_view()),
    path('reviewAdd', AddReview.as_view())
]
