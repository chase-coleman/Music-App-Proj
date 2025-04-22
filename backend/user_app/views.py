from rest_framework.authentication import TokenAuthentication
from django.contrib.auth import login, logout, authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from playlist_app.models import Playlist
from rest_framework import status as s
from .models import User
from .serializers import UserInfoSerializer
from django.shortcuts import get_object_or_404


# TokenReq class enforces a user be logged in to access certain pages/app functions
class TokenReq(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticated] 

class User_Info(TokenReq):
  def get(self, request):
    current_user = request.user
    user_info = {"email": current_user.email, 
                     "username": current_user.username, 
                     "first_name": current_user.first_name, 
                     "last_name": current_user.last_name,
                     "playlists": current_user.playlists.all()
                     }
    user_ser = UserInfoSerializer(user_info)
    return Response(user_ser.data)

  def put(self, request):
    data = request.data.copy()
    # pass the request's data into the serializer
    serialized = UserInfoSerializer(request.user, data=data, partial=True)
    if serialized.is_valid():
      serialized.save() # if the data is valid, save it to the db
      return Response({"message": "Info was successfully updated!"}, status=s.HTTP_200_OK)
    return Response(serialized.errors, status=s.HTTP_400_BAD_REQUEST)

class Sign_Up(APIView):
  def post(self, request):
    # TO DO : create error handling for user's that already exists so that a user can see that error on the frontend
    data = request.data.copy()
    # if user provided no username, their provided email is set as the username
    data['username'] = request.data.get("username", request.data.get("email"))
    # creating a new user instance
    new_user = User.objects.create_user(**data)
    # creating an authentication token for the new user
    user_token = Token.objects.create(user=new_user)
    new_playlist = Playlist.objects.create(name="Liked Songs", user=new_user)

    return Response({"Message": "Account successfully created!", "token": user_token.key}, 
                    status=s.HTTP_201_CREATED)

class Login(APIView):
  def post(self, request):
    data = request.data.copy()
    print(request.data)
    # setting their username to the email if they haven't create a username
    data['username'] = request.data.get("username", request.data.get("email"))
    # authenticate their provided username/password with their registered username/password
    current_user = authenticate(username=data.get("username"), password=data.get("password"))

    if current_user:
      login(request, current_user) # log them in 
      # get their token credentials or create one for them 
      token, create = Token.objects.get_or_create(user = current_user)
      return Response({"token":token.key}, status=s.HTTP_200_OK)
    
    return Response(f"Username or password incorrect", status=s.HTTP_400_BAD_REQUEST)
    # don't specify which is incorrect because that would help a malicious party
    # a direction to go

class Logout(TokenReq):
  def post(self, request):
    request.user.auth_token.delete()
    logout(request)
    return Response("user has been logged out", status=s.HTTP_200_OK)
  
class DeleteAccount(TokenReq):
  def delete(self, request):
      request.user.delete()
      return Response(status=s.HTTP_204_NO_CONTENT)