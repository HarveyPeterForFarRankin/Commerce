
from django.contrib import admin
from django.urls import path
from .views import ProductListView, OrdersListView, OrderDetail, AddOrderDetail, OrdersItemsListView, AddOrderItemDetail

urlpatterns = [
    path('products', ProductListView.as_view()),
    path('orders', OrdersListView.as_view()),
    path('orders/<int:pk>', OrderDetail.as_view()),
    path('orders/create', AddOrderDetail.as_view()),
    path('orders/items/create', AddOrderItemDetail.as_view()),
    path('orders/items/<int:pk>', OrdersItemsListView.as_view())
]
