from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import User

# Create Serializer to display User info 
class UserInfoSerializer(ModelSerializer):
  class Meta:
    model = User 
    fields = ['first_name', 'last_name', 'username', 'email', 'birthdate']