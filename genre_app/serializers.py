from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import *

class GenreSerializer(ModelSerializer):
  class Meta:
    model = Genre
    fields = '__all__'