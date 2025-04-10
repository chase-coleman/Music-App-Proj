"""
https://www.youtube.com/watch?v=WAmEZBEeNmg
tutorial help for the Spotify Web API
"""

from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from user_app.views import TokenReq
from django.conf import settings
from dotenv import load_dotenv
from requests import post, get
import requests
import os 
import base64 # used for encoding the spotify client ID + secret key together
import json 

# base64 is used to encode binary data into a string format using ASCII characters. ->
#  in simple terms, base64 turns binary data into plain text
# ASCII is standardized characters based off the english alphabet
# ASCII : aA-zZ, 0-9, symbols(!@#$...), special characters(newline, tab, backspace...), control characters

# TO DO : make it so we can store the spotify access token - maybe make a timer for it to generate a new token
#         every hour?

load_dotenv() # we have to load the environment variables from .env

SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID") # my personal client ID for Spotify
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET") # my Spotify API client secret number
spotify_item_search_url = "https://api.spotify.com/v1/"


# this function will call Spotify's API and get an access-token for our app
def get_spotify_token():
  auth_str = SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET
  auth_encoded = auth_str.encode("utf-8")
  # returns a base64 object, converts to a string so we can pass it w/ our headers when we send a request to Spotify
  auth_base64 = str(base64.b64encode(auth_encoded), "utf-8")

  spotify_token_url = "https://accounts.spotify.com/api/token"
  headers = {
    "Authorization": "Basic " + auth_base64,
    "Content-Type": "application/x-www-form-urlencoded" # Content type is telling the server what kind of data is being sent
  }
  data = {"grant_type": "client_credentials"} # this is the body of the request we'll be sending

  result = post(spotify_token_url, headers=headers, data=data)
  json_result = json.loads(result.content)
  token = json_result['access_token']
  return token

spotify_token = get_spotify_token()

def get_auth_header(spotify_token):
  return {"Authorization": "Bearer " + spotify_token}

headers = get_auth_header(spotify_token)

# STEPS TO GET item:
# search for item by name
# query = f"q={artist_name}&type=artist&limit=1" returns only 1 answer
def search_for_artist(spotify_token, artist_name):
  query = f"?q={artist_name}&type=artist&limit=1" # comma delimited list

  # this query is calling an endpoint that searches Spotify's db using a string
  # have to do this first because we need to get the artist/genre/album/track id to store in our database
  query_url = spotify_item_search_url + "search" + query
  result = get(query_url, headers=headers)

  json_result = json.loads(result.content)
  return json_result


# Create your views here.
class Spotify_Callback_View(TokenReq):  
  def get(self, request):
    # get the user's authorization token
    user_token = Token.objects.get(user=request.user)
    answer = search_for_artist(spotify_token, artist_name="Blood Orange")
    return Response(answer['artists']['items'][0]['id'])
  


