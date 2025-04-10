"""
DRF Docs on using writable nested serializers
https://www.django-rest-framework.org/api-guide/relations/#writable-nested-serializers

"""
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework import serializers
from .models import Playlist

class PlaylistSerializer(ModelSerializer):
  user = SerializerMethodField() # calls the get_user method before serialization to display the return value

  class Meta:
    model = Playlist 
    fields = ['id', 'name', 'user', 'description']

  def get_user(self, obj):
    # goes into the current object (playlist) -> 
    # get's the user object (since it's related) -> 
    # returns the user instance's username
    return obj.user.username
  
# this playlist will display the name, description, and how many songs are in the playlist
class PlaylistDisplaySerializer(ModelSerializer):
  pass 