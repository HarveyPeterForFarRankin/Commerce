from django.db import models
from django.db.models.base import Model
from Users.models import CustomUser
from datetime import datetime

class Product(models.Model):
    title = models.CharField(max_length=244, default='')
    inventory = models.IntegerField(default=0)
    cost = models.FloatField(default=0.0)
    category = models.CharField(max_length=140, default='')

    def __str__(self):
        return self.title

class Order(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=datetime.now)
    status = models.CharField(max_length=244, default='open')
    discount_code = models.CharField(max_length=244, default='', null=True)

    def __str__(self):
        return self.status
   
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    size = models.IntegerField(default=0)
    quantity = models.IntegerField(default=1)

class Return(models.Model):
    item = models.ForeignKey(OrderItem, on_delete=models.CASCADE)
    reason = models.CharField(max_length=500)
    returned = models.BooleanField(default=False)

class Review(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    review_text = models.CharField(max_length=500)

class Discount(models.Model):
    key = models.UUIDField()
    percentage = models.IntegerField(default=0)