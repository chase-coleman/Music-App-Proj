from django.urls import path
from .views import Playlists, Single_Playlist

urlpatterns = [
  path('', Playlists.as_view(), name="playlists"),
  path('<int:id>/', Playlists.as_view(), name="delete_playlist"),
  path('<str:playlist_name>/', Single_Playlist.as_view(), name="single_playlist"),
  # int id is used for our databse's song id's
  path('<str:playlist_name>/<int:id>/', Single_Playlist.as_view(), name="del_song"),
  # string id is used for spotify's song id's
  path('<str:playlist_name>/<str:id>/', Single_Playlist.as_view(), name="del_song"),
]

