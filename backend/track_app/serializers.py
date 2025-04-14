from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework import serializers
from .models import Track

class TrackSerializer(ModelSerializer):
  duration = SerializerMethodField()
  
  class Meta:
    model = Track
    fields = ['id','spotify_id','name', 'artist_name', 'artist_id', 'album_name', 'album_id', 'track_img_lg', 'track_img_md', 'track_img_sm', 'track_url', 'duration']

  def get_duration(self, obj):
    seconds = int(obj.duration.total_seconds()) # converts the full time into a single number that is how long the song is in seconds
    
    # divmod is essentially a modulus operator -> 
    # it tells us how many times 60 (length of a minute) fits into the seconds variable we defined above ->
    # and then also gives us the leftover amount
    minutes, seconds = divmod(seconds, 60) 
    return f"{minutes}:{seconds}"
