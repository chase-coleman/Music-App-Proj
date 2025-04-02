from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework import serializers
from .models import Album


class AlbumSerializer(ModelSerializer):
  artist = SerializerMethodField() # SerializerMethodField auto-calls the get_<field-name> 
  genres = SerializerMethodField() # SerializerMethodField auto-calls the get_<field-name> 

  def get_artist(self, obj): # obj refers to the model instance that is being serialized 
    from artist_app.serializers import ArtistSerializer
    return ArtistSerializer(obj.artist.all(), many=True).data

  def get_genres(self, obj): # obj refers to the model instance that is being serialized 
    from genre_app.serializers import GenreSerializer
    return GenreSerializer(obj.genres.all(), many=True).data

  class Meta:
    model = Album
    fields = ['id', 'name', 'artist', 'genres', 'songs']
    