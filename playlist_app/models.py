from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator
from django.contrib.auth.password_validation import validate_password
from django.db import models
from user_app.models import User

# Create your models here.
class Playlist(models.Model):
  # TO DO : create field for plalist_img
  name = models.CharField(max_length=100, null=False, blank=False)
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="playlists") # creating association between Playlist-User


  
