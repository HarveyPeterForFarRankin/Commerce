# Generated by Django 3.2.7 on 2021-09-16 18:46

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Products', '0009_product_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='created_at',
            field=models.DateTimeField(blank=True, default=datetime.datetime.now, null=True),
        ),
    ]