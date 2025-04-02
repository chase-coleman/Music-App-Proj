from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import *
from genre_app.serializers import *
from artist_app.serializers import *

class AlbumSerializer(ModelSerializer):
  artist = ArtistSerializer(many=True)
  genres = GenreSerializer(many=True)

  class Meta:
    model = Album
    fields = '__all__'
    