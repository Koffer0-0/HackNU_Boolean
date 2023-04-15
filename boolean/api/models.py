from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
class Client(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=20)
    username = models.CharField(max_length=20)
    email = models.EmailField(max_length=254)
    password = models.CharField(max_length=128)

class TechnicalSupportOperator(models.Model):
    first_name = models.CharField(max_length=100)
    second_name = models.CharField(max_length=100)
    password = models.CharField(max_length=128)

class TechnicalSpecialistGroup(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class TechnicalSpecialist(models.Model):
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=128)
    group = models.ForeignKey(TechnicalSpecialistGroup, on_delete=models.CASCADE, related_name='specialists')

class Request(models.Model):
    description = models.TextField()
    request_type = models.CharField(max_length=100)
    assigned_by = models.ForeignKey(TechnicalSupportOperator, on_delete=models.CASCADE, related_name='created_requests')
    created_by = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='created_requests')
    assigned_to = models.ForeignKey(TechnicalSpecialist, on_delete=models.CASCADE, related_name='assigned_requests')
    status = models.BooleanField(default=False)
