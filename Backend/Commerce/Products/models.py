from django.db import models
from Users.models import CustomUser
from datetime import datetime

class Product(models.Model):
    title = models.CharField(max_length=244, default='')
    inventory = models.IntegerField(default=0)
    cost = models.FloatField(default=0.0)

    def __str__(self):
        return self.title

class Order(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=datetime.now)
    status = models.CharField(max_length=244)

    def __str__(self):
        return self.status
   
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

class Return(models.Model):
    item = models.ForeignKey(OrderItem, on_delete=models.CASCADE)
    reason = models.CharField(max_length=500)
    returned = models.BooleanField(default=False)

class Review(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    review_text = models.CharField(max_length=500)