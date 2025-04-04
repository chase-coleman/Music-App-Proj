"""
DRF Docs on using writable nested serializers
https://www.django-rest-framework.org/api-guide/relations/#writable-nested-serializers

"""
from rest_framework.serializers import ModelSerializer, SerializerMethodField, PrimaryKeyRelatedField
from rest_framework import serializers
from .models import Playlist


class PlaylistSerializer(ModelSerializer):
  from song_app.serializers import Song, SongSerializer
  from user_app.serializers import User, UserSerializer

  songs =  serializers.PrimaryKeyRelatedField(many=True, queryset=Song.objects.all()) 
  user = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all())

  class Meta:
    model = Playlist
    fields = ['id', 'name', 'user', 'songs']

  def create(self, validated_data):
    user_id = validated_data.pop('user', [])
    song_id = validated_data.pop('songs', [])
    playlist = Playlist.objects.create(**validated_data)
    playlist.user.add(*user_id)
    playlist.songs.add(*song_id)
    return playlist








  # songs = SerializerMethodField() # SerializerMethodField auto-calls the get_<field-name> 
  # user = SerializerMethodField() # SerializerMethodField auto-calls the get_<field-name> 

  # def get_songs(self, obj): # obj refers to the model instance that is being serialized
  #   from song_app.serializers import SongSerializer
  #   return SongSerializer(obj.songs.all(), many=True).data
  
  # def get_user(self, obj): # obj refers to the model instance that is being serialized
  #   from user_app.serializers import UserSerializer
  #   return UserSerializer(obj.user.all(), many=True).data 