"""
DRF Docs on using writable nested serializers
https://www.django-rest-framework.org/api-guide/relations/#writable-nested-serializers

"""
from rest_framework.serializers import ModelSerializer, SerializerMethodField, PrimaryKeyRelatedField
from rest_framework import serializers
from .models import Playlist

class PlaylistSerializer(ModelSerializer):
  pass 
