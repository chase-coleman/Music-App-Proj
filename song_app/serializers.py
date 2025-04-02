from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import *

class SongSerializer(ModelSerializer):
  artist = ArtistSerializer(many=True)
  albums = AlbumSerializer(many=True)
  genres = GenreSerializer(many=True)
  
  class Meta:
    model = Song
    fields = '__all__'