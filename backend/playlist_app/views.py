from playlist_app.serializers import Playlist, PlaylistSerializer, PlaylistDisplaySerializer # importing needed models/serializers
from rest_framework.views import Response, APIView # importing needed Response and APIView classes
from rest_framework import status as s
from user_app.views import TokenReq
from .models import Playlist
from django.shortcuts import get_object_or_404
from track_app.models import Track

# Create your views here.
class Playlists(TokenReq):
  def get(self, request):
    users_playlists = Playlist.objects.filter(user=request.user)
    all_playlists = PlaylistSerializer(users_playlists, many=True)
    return Response(all_playlists.data, status=s.HTTP_200_OK)

  def delete(self, request, id):
    playlist_to_delete = Playlist.objects.get(id=id)
    print(playlist_to_delete)
    playlist_to_delete.delete()
    return Response(f"{playlist_to_delete.name} has been deleted.", status=s.HTTP_204_NO_CONTENT)

  def put(self, request, id):
    data = request.data.copy() # copy the request data
    # grab the playlist instance of the playlist being edited
    playlist_to_edit = get_object_or_404(Playlist, id=id, user=request.user)
    serialized = PlaylistSerializer(playlist_to_edit, data=data, partial=True)
    if serialized.is_valid():
      serialized.save() # if serialization has worked and is valid, save it
      return Response(status=s.HTTP_200_OK)
    return Response(serialized.errors, status=s.HTTP_400_BAD_REQUEST)

  def post(self, request):
    data = request.data.copy()
    data['user'] = request.user
    # turn data into the model
    new_playlist = Playlist.objects.create(**data)
    serialized_playlist = PlaylistSerializer(new_playlist)
    return Response(serialized_playlist.data)
  
class Single_Playlist(TokenReq):
  def get(self, request, playlist_name):
    viewed_playlist = get_object_or_404(Playlist, name=playlist_name, user=request.user)
    ser_playlist = PlaylistDisplaySerializer(viewed_playlist)
    return Response(ser_playlist.data, status=s.HTTP_200_OK)
  

  # in the delete request, we are passing either an int id (the song's database ID)
  # or we are passing a string id (spotify's id for the song)
  def delete(self, request, playlist_name, id):
    viewed_playlist = get_object_or_404(Playlist, name=playlist_name, user=request.user)

    if type(id) == int:
      track_to_delete = viewed_playlist.tracks.filter(id=id)
      if track_to_delete:
        # using .remove() removes the association. .delete() would remove the song from the entire database
        viewed_playlist.tracks.remove(id)
        return Response({"Message": "Song removed from playlist!"}, status=s.HTTP_204_NO_CONTENT)
    # if the id argument is a string (meaning we passed in Spotify's song ID as the arg)
    elif type(id) == str:
      track_to_delete = get_object_or_404(Track, spotify_id=id)
      viewed_playlist.tracks.remove(track_to_delete.id)

      return Response({"Message": "Song removed from playlist!"}, status=s.HTTP_204_NO_CONTENT)
    
