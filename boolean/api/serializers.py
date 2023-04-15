from rest_framework import serializers
from rest_framework import serializers
from .models import Client, TechnicalSupportOperator, TechnicalSpecialist, Request, TechnicalSpecialistGroup


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('name', 'address', 'phone_number', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

class TechnicalSupportOperatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechnicalSupportOperator
        fields = ('first_name', 'second_name', 'password')
        extra_kwargs = {'password': {'write_only': True}}

class TechnicalSpecialistSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechnicalSpecialist
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

class TechnicalSpecialistGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechnicalSpecialistGroup
        fields = '__all__'

class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = '__all__'

class ClientLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('email', 'password')

class TechnicalSpecialistLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechnicalSpecialist
        fields = ('username', 'password')

class TechnicalSupportOperatorLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechnicalSupportOperator
        fields = ('email', 'password')