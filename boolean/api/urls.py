from django.urls import path, include

from . import views

urlpatterns = [
    path('register/client/', views.ClientRegistration.as_view(), name='client-register'),
    path('register/specialist/', views.TechnicalSpecialistRegistration.as_view(), name='technical-specialist-register'),
    path('register/group/', views.TechnicalSpecialistGroupRegistration.as_view(), name='technical-specialist-register'),
    path('register/support-operator/', views.TechnicalSupportOperatorRegistration.as_view(), name='technical-support-operator-register'),
    path('login/', views.LoginView.as_view(), name='login'),
]