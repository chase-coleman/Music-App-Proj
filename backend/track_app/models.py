from django.db import models



# Create your models here.
class Track(models.Model):
  spotify_id = models.CharField(max_length=100, unique=True)
  name = models.CharField(max_length=255)
  track_url = models.CharField(max_length=255)
  duration = models.DurationField(blank=True, null=True)
  # artist
  # album
  # palylists M2MField association created in the Playlist Model
