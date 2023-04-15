from django.contrib.auth import authenticate, logout, login
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from boolean.urls import UserSerializer
class RegistrationView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        message = {
            "username": "string (required)",
            "email": "string (required)",
            "password": "string (required)",
            "confirm_password": "string (required)",
            "first_name": "string (optional)",
            "last_name": "string (optional)"
        }
        return Response(message)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        message = {
            "username": "string (required)",
            "password": "string (required)",
        }
        return Response(message)

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        else:
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        logout(request)
        return Response({'success': 'User Logged Out'}, status=status.HTTP_200_OK)