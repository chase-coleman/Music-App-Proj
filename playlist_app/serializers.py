from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import *
from song_app.serializers import *
from user_app.serializers import *

class PlaylistSerializer(ModelSerializer):
  songs = SongSerializer(many=True)
  user_id = UserSerializer(many=True)

  class Meta:
    model = Playlist
    fields = '__all__'