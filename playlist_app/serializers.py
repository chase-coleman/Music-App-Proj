from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework import serializers
from .models import Playlist

class PlaylistSerializer(ModelSerializer):
  songs = SerializerMethodField() # SerializerMethodField auto-calls the get_<field-name> 
  user = SerializerMethodField() # SerializerMethodField auto-calls the get_<field-name> 

  def get_songs(self, obj): # obj refers to the model instance that is being serialized
    from song_app.serializers import SongSerializer
    return SongSerializer(obj.songs.all(), many=True).data
  
  def get_user(self, obj): # obj refers to the model instance that is being serialized
    from user_app.serializers import UserSerializer
    return UserSerializer(obj.user.all(), many=True).data 
  
  class Meta:
    model = Playlist
    fields = '__all__'