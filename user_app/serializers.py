from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from rest_framework import serializers
from .models import User


# creates a serializer to get readable data from the 'user' table in the db
class UserSerializer(ModelSerializer):
  playlists = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

  class Meta:
    model = User 
    fields = ['id', 'username', 'first_name', 'last_name', 'email', 'playlists']

  def create(self, validated_data):
    # hash the password
    password = validated_data.pop("password", None)
    new_user = User.objects.create(**validated_data)
    if password:
      new_user.set_password(password)
    new_user.save() # save the new user instance
    return new_user

  def update(self, instance, validated_data):
    # hashing password if it is the field being updated  
    password = validated_data.pop("password", None)
    if  password:
      instance.set_password(password)
    return super().update(instance, validated_data)
  