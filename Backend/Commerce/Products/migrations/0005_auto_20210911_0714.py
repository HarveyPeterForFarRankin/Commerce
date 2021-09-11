# Generated by Django 3.2.7 on 2021-09-11 07:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Products', '0004_auto_20210911_0621'),
    ]

    operations = [
        migrations.CreateModel(
            name='Discount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.UUIDField()),
                ('percentage', models.IntegerField(default=0)),
            ],
        ),
        migrations.AddField(
            model_name='order',
            name='discount_code',
            field=models.CharField(default='', max_length=244, null=True),
        ),
        migrations.AddField(
            model_name='orderitem',
            name='size',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='product',
            name='category',
            field=models.CharField(default='', max_length=140),
        ),
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(default='open', max_length=244),
        ),
    ]
