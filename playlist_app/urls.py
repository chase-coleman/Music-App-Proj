from django.urls import path
from .views import All_playlists

urlpatterns = [
  path('all/', All_playlists.as_view(), name="all_playlists")
]