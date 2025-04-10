from playlist_app.serializers import Playlist, PlaylistSerializer # importing needed models/serializers
from rest_framework.views import Response, APIView # importing needed Response and APIView classes
from rest_framework import status as s
from user_app.views import TokenReq
from .models import Playlist

# Create your views here.
class Playlists(TokenReq):
  def get(self, request):
    all_playlists = PlaylistSerializer(Playlist.objects.all(), many=True)
    return Response(all_playlists.data, status=s.HTTP_200_OK)

  def delete(self, request, id):
    playlist_to_delete = Playlist.objects.get(id=id)
    print(playlist_to_delete)
    playlist_to_delete.delete()
    return Response(f"{playlist_to_delete.name} has been deleted.", status=s.HTTP_204_NO_CONTENT)

  def put(self, request, name):
    pass

  def post(self, request):
    data = request.data.copy()
    data['user'] = request.user
    # turn data into the model
    new_playlist = Playlist.objects.create(**data)
    serialized_playlist = PlaylistSerializer(new_playlist)
    return Response(serialized_playlist.data)
  