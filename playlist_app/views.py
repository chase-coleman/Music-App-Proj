from playlist_app.serializers import Playlist, PlaylistSerializer # importing needed models/serializers
from rest_framework.views import Response, APIView # importing needed Response and APIView classes
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status as s

# Create your views here.
class All_playlists(APIView):
  def get(self, request):
    # grabbing all the playlists from all users in the db 
    all_playlists = PlaylistSerializer(Playlist.objects.all(), many=True)
    return Response(all_playlists.data, status=s.HTTP_200_OK)
  
  def post(self, request):
    # set variable = the data from the POST request 
    new_playlist = PlaylistSerializer(data=request.data)
    print(new_playlist)
    if new_playlist.is_valid(): # check if that serialized data is valid 
      new_playlist.save() # if it is, save it to the db
      return Response(new_playlist.data, status=s.HTTP_201_CREATED)
    # if serialized data isn't valid, return the errors
    return Response(new_playlist.errors, status=s.HTTP_400_BAD_REQUEST)