from django.urls import path, include

from rest_framework import routers

from .views import *



urlpatterns = [
    path('v1/login/', LoginView.as_view(), name='login'),
    path('v1/register/', RegistrationView.as_view(), name='register'),
    path('v1/logout/', LogoutView.as_view(), name='logout'),
]
