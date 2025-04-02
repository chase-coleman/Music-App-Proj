from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator
from django.contrib.auth.password_validation import validate_password
from django.db import models
from user_app.models import User
from song_app.models import Song 

# Create your models here.
class Playlist(models.Model):
  # TO DO : create field for plalist_img
  name = models.CharField(max_length=100, null=False, blank=False)
  user_id = models.ManyToManyField(User ,related_name="playlists")
  songs =  models.ManyToManyField(Song, related_name="playlists")
