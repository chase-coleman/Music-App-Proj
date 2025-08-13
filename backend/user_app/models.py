from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
  email = models.EmailField(unique=True, max_length=100)
  username = models.CharField(max_length=50, unique=True, blank=True, null=True)
  birthdate = models.DateField(default='2000-01-01') 

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = [] 
  # playlists attribute will be created by the Playlists model

  def __str__(self):
    return self.email


