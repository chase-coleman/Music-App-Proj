from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Genre

class GenreSerializer(ModelSerializer):
  class Meta:
    model = Genre
    fields = ['id', 'name', 'artists', 'albums', 'songs']