from playlist_app.serializers import Playlist, PlaylistSerializer # importing needed models/serializers
from rest_framework.views import Response, APIView # importing needed Response and APIView classes
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status as s

# Create your views here.
class All_playlists(APIView):
  def get(self, request):
    all_playlists = PlaylistSerializer(Playlist.objects.all(), many=True)
    return Response(all_playlists.data, status=s.HTTP_200_OK)