from django.urls import path
from .views import Playlists

urlpatterns = [
  path('', Playlists.as_view(), name="playlists"),
  path('<int:id>/', Playlists.as_view(), name="delete_playlist")
]