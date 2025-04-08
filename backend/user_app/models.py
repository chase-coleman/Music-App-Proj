from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
  email = models.EmailField(unique=True, max_length=100)
  birthdate = models.DateField(default='2000-01-01') 
  REQUIRED_FIELDS = ['email'] # requiring email to have input
  # playlists attribute will be created by the Playlists model


