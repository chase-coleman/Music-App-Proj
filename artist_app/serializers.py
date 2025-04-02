from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import *
from album_app.serializers import *
from song_app.serializers import *

class ArtistSerializer(ModelSerializer):
  genres = GenreSerializer(many=True)
  # albums = AlbumSerializer(many=True)
  # songs = SongSerializer(many=True)

  class Meta:
    model = Artist
    fields = '__all__'
  