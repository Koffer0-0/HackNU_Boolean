from django.contrib.auth import authenticate, get_user_model
from django.db import transaction
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from api.models import Client, TechnicalSpecialist, TechnicalSupportOperator, TechnicalSpecialistGroup
from api.permissions import IsTechnicalSupportOperator
from api.serializers import ClientSerializer, TechnicalSpecialistSerializer, TechnicalSupportOperatorSerializer, \
    ClientLoginSerializer, TechnicalSpecialistLoginSerializer, TechnicalSupportOperatorLoginSerializer, \
    TechnicalSpecialistGroupSerializer


class LoginView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ClientLoginSerializer

    def get_serializer_class(self):
        user = self.request.user
        if isinstance(user, Client):
            return ClientLoginSerializer
        elif isinstance(user, TechnicalSpecialist):
            return TechnicalSpecialistLoginSerializer
        elif isinstance(user, TechnicalSupportOperator):
            return TechnicalSupportOperatorLoginSerializer
        return super().get_serializer_class()

    def post(self, request):
        email_or_username = request.data.get('email_or_username')
        password = request.data.get('password')

        User = get_user_model()

        try:
            user = User.objects.get(email=email_or_username)
        except User.DoesNotExist:
            try:
                user = User.objects.get(username=email_or_username)
            except User.DoesNotExist:
                return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        user = authenticate(request, username=user.username, password=password)
        if user is not None:
            serializer_class = self.get_serializer_class()
            return Response(serializer_class(user).data)
        else:
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class ClientRegistration(generics.CreateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [permissions.AllowAny]

class TechnicalSpecialistRegistration(generics.CreateAPIView):
    queryset = TechnicalSpecialist.objects.all()
    serializer_class = TechnicalSpecialistSerializer
    permission_classes = [permissions.AllowAny]

class TechnicalSpecialistGroupRegistration(generics.CreateAPIView):
    queryset = TechnicalSpecialist.objects.all()
    serializer_class = TechnicalSpecialistGroupSerializer
    permission_classes = [permissions.AllowAny]

class TechnicalSupportOperatorRegistration(generics.CreateAPIView):
    queryset = TechnicalSupportOperator.objects.all()
    serializer_class = TechnicalSupportOperatorSerializer
    permission_classes = [IsTechnicalSupportOperator]
