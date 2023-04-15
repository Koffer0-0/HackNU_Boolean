from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token

from . import views
from .views import ClientRegistrationView, OperatorRegistrationView, SpecialistRegistrationView, LoginView

urlpatterns = [
    path('client/register/', ClientRegistrationView.as_view(), name='client_register'),
    path('operator/register/', OperatorRegistrationView.as_view(), name='operator_register'),
    path('specialist/register/', SpecialistRegistrationView.as_view(), name='specialist_register'),
    path('login/', LoginView.as_view(), name='login'),
]