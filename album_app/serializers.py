from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import *

class AlbumSerializer(ModelSerializer):
  class Meta:
    model = Album
    fields = '__all__'
    