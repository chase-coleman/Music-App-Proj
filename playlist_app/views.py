from playlist_app.serializers import Playlist, PlaylistSerializer # importing needed models/serializers
from rest_framework.views import Response, APIView # importing needed Response and APIView classes
from django.shortcuts import render
from rest_framework import status as s
from user_app.views import TokenReq
from .models import Playlist

# Create your views here.
class Playlists(TokenReq):
  def post(self, request):
    data = request.data.copy()
    data['user'] = request.user
    # turn data into the model
    new_playlist = Playlist.objects.create(**data)
    serialized_playlist = PlaylistSerializer(new_playlist)
    return Response(serialized_playlist.data)
  