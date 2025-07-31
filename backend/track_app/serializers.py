from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework import serializers
from .models import Track
 
#  https://www.w3schools.com/PYTHON/ref_func_divmod.asp
#  - divmod resource

class TrackSerializer(ModelSerializer):
  duration = SerializerMethodField()
  
  class Meta:
    model = Track
    fields = ['id','spotify_id','name', 'artist_name', 'artist_id', 'album_name', 'album_id', 'track_img_lg', 'track_img_md', 'track_img_sm', 'track_url', 'duration']

  def get_duration(self, obj):
    total_seconds = int(obj.duration.total_seconds()) # converts the full time into a single number that is how long the song is in seconds
    # divmod is essentially a modulus operator -> 
    # it tells us how many times 60 (length of a minute) fits into the seconds variable we defined above ->
    # and then also gives us the leftover amount
    
    # get the total hours that fit in total_seconds
    # 1 hour = 60 minutes = 3600 seconds (60 * 60 = 3600)
    hours, remainder = divmod(total_seconds, 3600)

    # divide the remainder by 60 to get total minutes and the leftover will be the seconds
    minutes, seconds = divmod(remainder, 60)
    
    # adding the :02 keeps formatting proper by using padding
    # otherwise, 3:07 would be 3:7
    if hours > 0:
      return f"{hours}:{minutes:02}:{seconds:02}"
    else:
      return f"{minutes}:{seconds:02}"
