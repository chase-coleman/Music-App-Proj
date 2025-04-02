from user_app.serializers import User, UserSerializer # importing needed models/serializers
from rest_framework.views import Response, APIView # importing needed Response and APIView classes
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status as s

# Create your views here.
class All_users(APIView):
  def get(self, request):
    all_users = UserSerializer(User.objects.all(), many=True)
    return Response(all_users.data, status=s.HTTP_200_OK)