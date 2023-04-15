from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, AbstractUser
from django.db import models
from django.conf import settings

class User(AbstractUser):
  #Boolean fields to select the type of account.
  is_client = models.BooleanField(default=False)
  is_operator = models.BooleanField(default=False)
  is_specialist = models.BooleanField(default=False)
  groups = models.ManyToManyField(
      'auth.Group',
      related_name='api_users',
      blank=True,
      help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
      verbose_name='groups',
  )
  user_permissions = models.ManyToManyField(
      'auth.Permission',
      related_name='api_users',
      blank=True,
      help_text='Specific permissions for this user.',
      verbose_name='user permissions',
  )

class Client(models.Model):
    client = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField(max_length=254)

    def __str__(self):
        return self.client.username

class TechnicalSupportOperator(models.Model):
    operator = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100)
    second_name = models.CharField(max_length=100)

    def __str__(self):
        return self.operator.username

class TechnicalSpecialistGroup(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class TechnicalSpecialist(models.Model):
    specialist = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=20)
    group = models.ForeignKey(TechnicalSpecialistGroup, on_delete=models.CASCADE, related_name='specialists')

    def __str__(self):
        return self.specialist.username

class Request(models.Model):
    description = models.TextField()
    request_type = models.CharField(max_length=100)
    assigned_by = models.ForeignKey(TechnicalSupportOperator, on_delete=models.CASCADE, related_name='created_requests')
    created_by = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='created_requests')
    assigned_to = models.ForeignKey(TechnicalSpecialist, on_delete=models.CASCADE, related_name='assigned_requests')
    status = models.BooleanField(default=False)
