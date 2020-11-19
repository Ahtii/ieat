from django.db import models
from django.core.validators import RegexValidator
import datetime

phone_regex = RegexValidator(regex=r'^\d{10}$')

class Customer(models.Model):
    name = models.CharField(max_length=50)
    phone = models.CharField(validators=[phone_regex], max_length=10, unique=True)
    email = models.EmailField(null=True)
    occupation = models.CharField(max_length=30)
    heard_from = models.CharField(max_length=9)
    submit_date = models.DateField(default=datetime.date.today)

class Restaurant(models.Model):
    name = models.CharField(max_length=50)
    phone = models.CharField(validators=[phone_regex], max_length=10, unique=True)
    email = models.EmailField(null=True)
    address = models.CharField(max_length=150)
    heard_from = models.CharField(max_length=9)
    submit_date = models.DateField(default=datetime.date.today)