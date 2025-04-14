from django.shortcuts import render
from track_app.models import Track
from rest_framework.views import Response
from user_app.views import TokenReq
from rest_framework import status as s
from playlist_app.models import Playlist

# TO DO : make handling the duration account for songs that may be longer than an hour

# Create your views here.
class Tracks(TokenReq):
  def post(self, request):
    track_data = request.data.copy()
    track_sec = track_data['duration'][-2:] # grab the value of track's 'seconds' 
    track_min = track_data['duration'][:-3] # grab the value of track's 'minutes' 

    # here we have to properly format the track's duration
    # in the Track model, I am using a DurationField type
    # which accepts duration's as "HH:MM:SS"
    if len(track_min) > 1: 
      track_data['duration'] = f"00:{track_min}:{track_sec}"
    else:
      track_data['duration'] = f"00:0{track_min}:{track_sec}"

    # each track has a unique spotify ID#, so we need to see if it already exists
    # in the database, or create it if it doesn't exist
    new_track, created = Track.objects.get_or_create(
      spotify_id = track_data["spotify_id"],
      defaults={
        "name": track_data["name"],
        "track_url": track_data["track_url"],
        "duration": track_data["duration"]
      }
    )

    # grab the user's liked songs playlist
    user_liked_playlist = Playlist.objects.get(user=request.user, name="Liked Songs")
    # if the song already exists in the user's Liked Songs, notify user
    if user_liked_playlist.tracks.filter(pk=new_track.pk).exists():
      return Response({'message': "Track already in liked songs!"}, status=s.HTTP_400_BAD_REQUEST)
    # else, add new song to their liked song
    user_liked_playlist.tracks.add(new_track)
    return Response({"Message": "Track added to liked songs!"},status=s.HTTP_201_CREATED)