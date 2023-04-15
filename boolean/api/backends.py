from django.contrib.auth.backends import ModelBackend

from api.models import Client, TechnicalSupportOperator, TechnicalSpecialist


class MultiModelBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        # Check credentials against Client model
        try:
            client = Client.objects.get(email=username)
            if client.password == password:
                return client.client
        except Client.DoesNotExist:
            pass

        # Check credentials against TechnicalSupportOperator model
        try:
            operator = TechnicalSupportOperator.objects.get(first_name=username)
            if operator.password == password:
                return operator.operator
        except TechnicalSupportOperator.DoesNotExist:
            pass

        # Check credentials against TechnicalSpecialist model
        try:
            specialist = TechnicalSpecialist.objects.get(username=username)
            if specialist.password == password:
                return specialist.specialist
        except TechnicalSpecialist.DoesNotExist:
            pass

        return None