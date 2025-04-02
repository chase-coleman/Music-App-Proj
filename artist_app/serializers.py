from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework import serializers
from .models import Artist

class ArtistSerializer(ModelSerializer):
  genres = SerializerMethodField() # SerializerMethodField auto-calls the get_<field-name> 

  def get_genres(self, obj): # obj refers to the model instance that is being serialized
    from genre_app.serializers import GenreSerializer
    return GenreSerializer(obj.genres.all(), many=True).data

  class Meta:
    model = Artist
    fields = ['id', 'name', 'genres', 'albums', 'songs']
  
  # from artist_app.serializers import * 