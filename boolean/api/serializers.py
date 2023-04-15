from django.contrib.auth import authenticate
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Client, TechnicalSupportOperator, TechnicalSpecialist

User = get_user_model()

User = get_user_model()

class ClientRegistrationSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Client
        fields = ('email', 'password', 'name', 'address', 'phone_number', 'user')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password'],
            is_client=True,
        )
        client = Client.objects.create(user=user, **validated_data)
        return client
    
class OperatorRegistrationSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = TechnicalSupportOperator
        fields = ('email', 'password', 'first_name', 'second_name', 'user')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password'],
            is_operator=True,
        )
        operator = TechnicalSupportOperator.objects.create(user=user, **validated_data)
        return operator

class SpecialistRegistrationSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = TechnicalSpecialist
        fields = ('email', 'password', 'group', 'user')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password'],
            is_specialist=True,
        )
        specialist = TechnicalSpecialist.objects.create(user=user, **validated_data)
        return specialist

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        user = authenticate(username=attrs['email'], password=attrs['password'])
        if not user:
            raise serializers.ValidationError("Invalid login credentials.")
        return {'user': user}