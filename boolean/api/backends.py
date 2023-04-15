from django.contrib.auth.backends import ModelBackend

from api.models import Client, TechnicalSupportOperator, TechnicalSpecialist


class ClientBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            client = Client.objects.get(client__username=username)
        except Client.DoesNotExist:
            return None

        if client.password == password:
            return client.client

class OperatorBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            operator = TechnicalSupportOperator.objects.get(operator__username=username)
        except TechnicalSupportOperator.DoesNotExist:
            return None

        if operator.password == password:
            return operator.operator

class SpecialistBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            specialist = TechnicalSpecialist.objects.get(specialist__username=username)
        except TechnicalSpecialist.DoesNotExist:
            return None

        if specialist.password == password:
            return specialist.specialist