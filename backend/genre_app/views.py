from .serializers import Genre, GenreSerializer
from rest_framework.views import Response, APIView # importing needed Response and APIView classes
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status as s

# Create your views here.
class All_genres(APIView):
  def get(self, request):
    all_genres = GenreSerializer(Genre.objects.all(), many=True)
    return Response(all_genres.data, status=s.HTTP_200_OK)