from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import *

class ArtistSerializer(ModelSerializer):
  class Meta:
    model = Artist
    fields = '__all__'
  