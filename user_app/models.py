from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator
# Create your models here.

class User(AbstractUser):
  # TO DO : add playlists ManyToManyField after it's creation
  email = models.EmailField(unique=True, max_length=100)
  birthdate = models.DateField(default='2000-01-01')
  REQUIRED_FIELDS = ['email']
