from django.contrib.auth import authenticate
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Client

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}
class ClientLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        user = authenticate(username=username, password=password)
        if user and user.is_client:
            data['user'] = user
        else:
            raise serializers.ValidationError('Invalid username or password')

        return data


class OperatorLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        operator = authenticate(username=username, password=password)
        if operator and operator.is_operator:
            data['operator'] = operator
        else:
            raise serializers.ValidationError('Invalid username or password')

        return data

class ClientRegistrationSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Client
        fields = ('id', 'user', 'name', 'address', 'phone_number', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data, is_client=True)
        client = Client.objects.create(user=user, **validated_data)
        return client

class SpecialistLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        specialist = authenticate(username=username, password=password)
        if specialist and specialist.is_specialist:
            data['specialist'] = specialist
        else:
            raise serializers.ValidationError('Invalid username or password')

        return data