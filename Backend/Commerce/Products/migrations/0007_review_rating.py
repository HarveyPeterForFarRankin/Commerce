# Generated by Django 3.2.7 on 2021-09-11 21:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Products', '0006_alter_discount_key'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='rating',
            field=models.IntegerField(default=0),
        ),
    ]