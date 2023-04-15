from django.contrib.auth import authenticate
from rest_framework import permissions, status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from api.serializers import ClientRegistrationSerializer, OperatorRegistrationSerializer, \
    SpecialistRegistrationSerializer, UserLoginSerializer


class SpecialistRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SpecialistRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            specialist = serializer.save()
            token, _ = Token.objects.get_or_create(user=specialist.user)
            return Response({'token': token.key}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class ClientRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ClientRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            client = serializer.save()
            token, _ = Token.objects.get_or_create(user=client.user)
            return Response({'token': token.key}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OperatorRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = OperatorRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            operator = serializer.save()
            token, _ = Token.objects.get_or_create(user=operator.user)
            return Response({'token': token.key}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
