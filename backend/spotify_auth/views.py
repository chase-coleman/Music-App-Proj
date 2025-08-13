"""
https://www.youtube.com/watch?v=WAmEZBEeNmg
tutorial help for the Spotify Web API
"""
from rest_framework import status as s
from rest_framework.response import Response
from user_app.views import TokenReq
from dotenv import load_dotenv
from requests import post, get
import os 
from .encoding import encode_client_credentials
import json 

# base64 is used to encode binary data into a string format using ASCII characters. ->
#  in simple terms, base64 turns binary data into plain text
# ASCII is standardized characters based off the english alphabet
# ASCII : aA-zZ, 0-9, symbols(!@#$...), special characters(newline, tab, backspace...), control characters

# TO DO : refactor code so that each user has their own spotify refresh token (meaning they need their own spotify account), 
# store that into field for the user's model via new field for it, fix Spotify_Callback_View method to get that refresh token from the database
# TO DO : create methods that parse through the return data based on if it is a song, artist, etc
# TO DO : create models + model.fields to store a user's liked artists, songs, etc
# TO DO : using this views.py file, create model instances for when a user wants to like/follow that stuff


#### Environment Variables ###
load_dotenv() # we have to load the environment variables from .env
SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID") # my personal client ID for Spotify
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET") # my Spotify API client secret number
SPOTIFY_REFRESH_TOKEN = os.getenv("SPOTIFY_REFRESH_TOKEN") # my spotify account's refresh token
SPOTIFY_REDIRECT_URI = os.getenv("SPOTIFY_REDIRECT_URI")

spotify_item_search_url = "https://api.spotify.com/v1/" # endpoint for Spotify's item search URL

class Spotify_Callback_View(TokenReq):

    def get(self, request, item=None):
        # grab my refresh token
        refresh_token = SPOTIFY_REFRESH_TOKEN
        if not refresh_token:
            return Response({"error": "This application's refresh token is invalid/corrupted. Please contact the site manager."})
        
        ### Error handling for retrieving Spotify refresh or access tokens ###
        try:
            # call necessary functions to generate an access token
            access_token = self.get_spotify_token(refresh_token)
            headers = self.get_auth_header(access_token)
        except Exception as e:
            return Response({"error": "There was an error in retrieving the user's refresh/access token", "details":str(e)}, status=s.HTTP_500_INTERNAL_SERVER_ERROR)
        # if the user is searching for a song/album/artist, go this route
        if item:
            try:
                results = self.search_for_item(access_token, item=item, headers=headers)
                return Response(results)
            except Exception as e:
                return Response({"error": "There was an error retrieving search results", "details": str(e)}, status=s.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({"access_token": access_token}, status=s.HTTP_200_OK)


    def get_spotify_token(self, refresh_token=None):

        # get a new access token using the refresh token
        if refresh_token:
            try:
                access_token = self.get_access_refresh(refresh_token)
                return access_token
            except Exception as e:
                return Response({"error": "There was an error retrieving user's access token", "details": str(e)}, status=s.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            # encode_client_credentials is a helper function in encode.py
            # returns a base64 object, converts to a string so we can pass it w/ our headers when we send a request to Spotify
            auth_base64 = encode_client_credentials(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET)
            # create variables to use in the POST request to generate a token
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
        except Exception as e:
            return Response({"error": "There was an error getting the access token", "details": str(e)}, status=s.HTTP_500_INTERNAL_SERVER_ERROR)

        

    # if the refresh token exists, use it to get a new access token
    def get_access_refresh(self, refresh_token):
        auth_base64 = encode_client_credentials(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET)
        spotify_token_url = "https://accounts.spotify.com/api/token"
        scopes = "user-read-private user-read-email playlist-read-private streaming user-read-playback-state user-modify-playback-state"
        headers = {"Authorization": "Basic " + auth_base64, "Content-Type": "application/x-www-form-urlencoded"}
        data = {"grant_type": "refresh_token", 
                "refresh_token": refresh_token,
                }

        result = post(spotify_token_url, headers=headers, data=data)

        if result.status_code != 200:
            print("Token Access Request Failed:", result.status_code, result.text)
            raise Exception("Token Access Request Failed")
        json_result = json.loads(result.content)

        if "access_token" in json_result:
            return json_result['access_token']

        return Response({"error": "Failed to use refresh token. Please contact site admin"})

    @classmethod
    def get_auth_header(cls, access_token):
        return {"Authorization": "Bearer " + access_token}

    # convert the song duration from ms into proper time format (hh:mm:ss)
    @classmethod
    def convert_ms_into_minutes(cls, ms):
        seconds = (ms // 1000) % 60
        minutes = (ms // 1000) // 60
        return f"{minutes}:{str(seconds).zfill(2)}"

    # call spotify's general search api endpoint to get the meta data about the searched item
    @classmethod
    def search_for_item(cls, access_token, item, headers):
        query = f"?q={item}&type=artist,album,track&limit=15"
        query_url = spotify_item_search_url + "search" + query
        search_result = get(query_url, headers=headers)
        json_result = search_result.json()

        tracks = [{"id": track['id'], "track_name": track['name'], "artist": track['artists'][0]['name'],
                   "track_img_lg": track['album']['images'][0]['url'] if len(track['album']['images']) > 0 else None,
                   "track_img_md": track['album']['images'][1]['url'] if len(track['album']['images']) > 1 else None,
                   "track_img_sm": track['album']['images'][2]['url'] if len(track['album']['images']) > 2 else None,
                   "artist_id": track['artists'][0]['id'],
                   "album": track['album']['name'], "album_id": track['album']['id'],
                   "track_duration": cls.convert_ms_into_minutes(track['duration_ms']),
                   "track_url": track['href']
                   }
                  for track in json_result['tracks']['items']]
        artists = [{"id": artist['id'], "artist_name": artist['name'], "followers": artist['followers']['total'],
                    "artist_img_lg": artist['images'][0]['url'] if len(artist['images']) > 0 else None,
                    "artist_img_md": artist['images'][1]['url'] if len(artist['images']) > 1 else None,
                    "artist_img_sm": artist['images'][2]['url'] if len(artist['images']) > 2 else None,
                    "popularity": artist['popularity'],
                    "artist_url": artist['href'],
                    }
                   for artist in json_result['artists']['items']]
        albums = [{"id": album['id'], "album_name": album['name'], "artist": album['artists'][0]['name'],
                   "album_img_lg": album['images'][0]['url'] if len(album['images']) > 0 else None,
                   "album_img_md": album['images'][1]['url'] if len(album['images']) > 1 else None,
                   "album_img_sm": album['images'][2]['url'] if len(album['images']) > 2 else None,
                   "release_date": album['release_date'],
                   "album_url": album['href']
                   }
                  for album in json_result['albums']['items']]

        return [
            {"tracks": tracks,
            "artists": artists,
            "albums": albums},
        ]
  


