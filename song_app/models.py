from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class Song(models.Model):
  # TO DO : create artist_id field using MtM
  # TO DO : create duration field - what modelField type?
  # TO DO : create song_img field
  name = models.CharField(max_length=100, null=False, blank=False)
  description = models.CharField(max_length=255, null=True, default="This song hasn't been given a description yet.")
  # playlist field will be created by the Playlist model as "playlists"