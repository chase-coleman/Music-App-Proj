from .serializers import Artist, ArtistSerializer
from rest_framework.views import Response, APIView # importing needed Response and APIView classes
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status as s

# Create your views here.
class All_artists(APIView):
  def get(self, request):
    all_artists = ArtistSerializer(Artist.objects.all(), many=True)
    return Response(all_artists.data, status= s.HTTP_200_OK)

