from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator
from django.db import models
from artist_app.models import *
from genre_app.models import *

# Create your models here.
class Album(models.Model):
  # TO DO : create field for album_img
  name = models.CharField(max_length=100, null=False, blank=True)
  description = models.CharField(max_length=255, null=True, default="This album hasn't been given a description yet.")
  artist = models.ManyToManyField(Artist, related_name="albums")
  genres = models.ManyToManyField(Genre, related_name="genres")
