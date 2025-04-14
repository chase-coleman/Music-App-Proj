from django.urls import path
from .views import Playlists, Single_Playlist

urlpatterns = [
  path('', Playlists.as_view(), name="playlists"),
  path('<int:id>/', Playlists.as_view(), name="delete_playlist"),
  path('<str:playlist_name>/', Single_Playlist.as_view(), name="single_playlist"),
  path('<str:playlist_name>/<int:id>/', Single_Playlist.as_view(), name="del_song"),
]