# Generated by Django 3.1.1 on 2020-11-10 19:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ieat', '0005_auto_20201110_1908'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='submit_date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='restaurant',
            name='submit_date',
            field=models.DateField(),
        ),
    ]