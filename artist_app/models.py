from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class Artist(models.Model):
  # TO DO : create artist_img field 
  name = models.CharField(max_length=100, null=False, blank=False)
  description = models.CharField(max_length=255, null=True, default="This artist hasn't been given a description yet.")
  # genre field generated by Genre model as "genres"
  # albums field generated by Genre model as "albums"
  # songs field generated by Genre model as "songs"