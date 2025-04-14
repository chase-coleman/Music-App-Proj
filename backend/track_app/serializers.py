from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework import serializers
from .models import Track

class TrackSerializer(ModelSerializer):
  class Meta:
    model = Track
    fields = ['name', 'artist_name', 'artist_id', 'album_name', 'album_id', 'track_img_lg', 'track_img_md', 'track_img_sm', 'track_url', 'duration']
