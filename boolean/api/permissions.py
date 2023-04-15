from rest_framework import permissions

from api.models import TechnicalSupportOperator


class IsTechnicalSupportOperator(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and isinstance(request.user, TechnicalSupportOperator)