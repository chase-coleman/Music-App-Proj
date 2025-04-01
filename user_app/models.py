from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator
# Create your models here.

class User(models.Model):
  # TO DO : add birthdate and profile_img field for User
  # TO DO : add playlists ManyToManyField after it's creation
  name = models.CharField(max_length=100, null=False, default="New User", validators=[])
  email = models.EmailField(max_length=100, unique=True, null=False, blank=False, validators=[])
  password = models.CharField(max_length=30, null=False, blank=False, validators=[MinValueValidator(8)])
