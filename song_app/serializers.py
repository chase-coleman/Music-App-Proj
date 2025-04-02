from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import *

class SongSerializer(ModelSerializer):
  class Meta:
    model = Song
    fields = '__all__'