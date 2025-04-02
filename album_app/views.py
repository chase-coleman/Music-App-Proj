from .serializers import Album, AlbumSerializer
from rest_framework.views import Response, APIView # importing needed Response and APIView classes
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status as s

# Create your views here.
class All_albums(APIView):
  def get(self, request):
    all_albums = AlbumSerializer(Album.objects.all(), many=True)
    return Response(all_albums.data, status= s.HTTP_200_OK)