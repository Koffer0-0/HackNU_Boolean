from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _


class CustomUserManager(BaseUserManager):
    def create_user(self, email, role, password=None, **extra_fields):
        if not email:
            raise ValueError(_('Email field is required'))
        email = self.normalize_email(email)
        user = self.model(email=email, role=role, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, 'TechnicalSupportOperator', password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ('Client', 'Client'),
        ('TechnicalSpecialist', 'Technical Specialist'),
        ('TechnicalSupportOperator', 'Technical Support Operator'),
    )

    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=30, choices=ROLE_CHOICES)
    is_active = models.BooleanField(default=True)

    groups = models.ManyToManyField(
        'auth.Group',
        blank=True,
        help_text=(
            'The groups this user belongs to. A user will get all permissions '
            'granted to each of their groups.'
        ),
        related_name="customuser_set",
        related_query_name="user",
        verbose_name=('groups'),
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        blank=True,
        help_text=('Specific permissions for this user.'),
        related_name="customuser_set",
        related_query_name="user",
        verbose_name=('user permissions'),
    )

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'role']


class Company(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=20)
    client = models.OneToOneField(CustomUser, on_delete=models.CASCADE)


class Team(models.Model):
    name = models.CharField(max_length=100)
    members = models.ManyToManyField(CustomUser, related_name='team_members')


class Task(models.Model):
    description = models.TextField()
    created_by = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='created_tasks')
    assigned_to = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='assigned_tasks')
    status = models.BooleanField(default=False)