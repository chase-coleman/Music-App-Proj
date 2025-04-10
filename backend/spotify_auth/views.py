import requests
from rest_framework.response import Response
from django.conf import settings
from django.views import View 
from user_app.views import TokenReq
from rest_framework.authtoken.models import Token

# Create your views here.
class Spotify_Callback_View(TokenReq):  
  def get(self, request):
    # get the user's authorization token
    user_token = Token.objects.get(user=request.user)
    return Response({"token": user_token.key})
