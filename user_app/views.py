from rest_framework.authentication import TokenAuthentication
from django.contrib.auth import login, logout, authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status as s
from .models import User

# TokenReq class enforces a user be logged in to access certain pages/app functions
class TokenReq(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticated] 
  
class User_Info(TokenReq):
  def get(self, request):
    current_user = request.user
    return Response({"email": current_user.email, 
                     "username": current_user.username, 
                     "first_name": current_user.first_name, 
                     "last_name": current_user.last_name
                     })
  
class Sign_Up(APIView):
  def post(self, request):
    data = request.data.copy()
    # if user provided no username, their provided email is set as the username
    data['username'] = request.data.get("username", request.data.get("email"))
    # creating a new user instance
    new_user = User.objects.create_user(**data)
    # creating an authentication token for the new user
    user_token = Token.objects.create(user=new_user)

    return Response(f"New account created with the username of {new_user.username}!", 
                    status=s.HTTP_201_CREATED)