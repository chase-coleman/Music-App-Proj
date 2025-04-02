from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import *



# creates a serializer to get readable data from the 'user' table in the db
class UserSerializer(ModelSerializer):
  class Meta:
    model = User 
    fields = ['id', 'username', 'first_name', 'last_name', 'email']
  