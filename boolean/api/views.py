from rest_framework import permissions
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from api.serializers import ClientLoginSerializer, OperatorLoginSerializer, SpecialistLoginSerializer, \
    ClientRegistrationSerializer


class ClientLoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ClientLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user_id': user.id})

class ClientRegistrationAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ClientRegistrationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        client = serializer.save()
        return Response({'id': client.id, 'message': 'Registration successful'})

class OperatorLoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = OperatorLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        operator = serializer.validated_data['operator']
        token, created = Token.objects.get_or_create(user=operator)
        return Response({'token': token.key, 'operator_id': operator.id})


class SpecialistLoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = SpecialistLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        specialist = serializer.validated_data['specialist']
        token, created = Token.objects.get_or_create(user=specialist)
        return Response({'token': token.key, 'specialist_id': specialist.id})