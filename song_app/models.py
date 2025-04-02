from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator
from django.contrib.auth.password_validation import validate_password
from django.db import models
from artist_app.serializers import Artist
from album_app.serializers import Album
from genre_app.serializers import Genre

# Create your models here.
class Song(models.Model):
  # TO DO : create artist_id field using MtM
  # TO DO : create duration field - what modelField type?
  # TO DO : create song_img field
  name = models.CharField(max_length=100, null=False, blank=False)
  description = models.CharField(max_length=255, null=True, default="This song hasn't been given a description yet.")
  artist = models.ManyToManyField(Artist, related_name="songs")
  albums = models.ManyToManyField(Album, related_name="songs")
  genres = models.ManyToManyField(Genre, related_name="songs")
  # playlist field will be created by the Playlist model as "playlists"