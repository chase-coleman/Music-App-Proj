from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from rest_framework.serializers import ValidationError
from .models import User
import random
import re

# Create Serializer to display User info 
class UserInfoSerializer(ModelSerializer):
  class Meta:
    model = User 
    fields = ['first_name', 'last_name', 'username', 'email', 'birthdate']

class UserSignupSerializer(ModelSerializer):
  class Meta:
    model = User
    fields = ["email", "username", "password", "first_name", "last_name"]
    extra_kwargs = {
      'password': {'write_only': True},
      'email': {'required': True},
      'first_name': {'required': True},
      'last_name': {'required': True}
    }

  def validate_first_name(self, fname):
    if not fname.strip():
      raise ValidationError("First name cannot be blank.")
    return fname

  def validate_last_name(self, lname):
    if not lname.strip():
      raise ValidationError("Last name cannot be blank")
    return lname

  def create(self, validated_data):
    # if the user did not enter a username, generate them a random one using first + last + random int's
    # ie bobsanders1534
    if not validated_data.get("username"):
        first = validated_data.get("first_name", "")
        last = validated_data.get("last_name", "")

        if not first or not last:
          raise ValidationError("Cannot generate username without first and last name.")

        # removes all non-alphabetical characters from first name
        first = re.sub(r'\W+', '', first.lower())
        last = re.sub(r'\W+', '', last.lower())

        random_digits = str(random.randint(1000, 9999))
        base_username = f"{first}{last}{random_digits}"

        while User.objects.filter(username=base_username).exists():
            random_digits = str(random.randint(1000, 9999))
            base_username = f"{first}{last}{random_digits}"

        validated_data["username"] = base_username

    return User.objects.create_user(**validated_data)