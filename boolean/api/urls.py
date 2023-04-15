from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token

from . import views
from .views import ClientRegistrationAPIView, ClientLoginAPIView, OperatorLoginAPIView, SpecialistLoginAPIView

urlpatterns = [
    path('auth/', include('rest_framework.urls')),
    path('token-auth/', obtain_auth_token, name='api_token_auth'),
    path('client/register/', ClientRegistrationAPIView.as_view(), name='client-register'),
    path('client/login/', ClientLoginAPIView.as_view(), name='client-login'),
    path('operator/login/', OperatorLoginAPIView.as_view(), name='operator-login'),
    path('specialist/login/', SpecialistLoginAPIView.as_view(), name='specialist-login'),
]