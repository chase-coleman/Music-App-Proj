from django.urls import path 
from .views import Spotify_Callback_View

urlpatterns = [
  path('', Spotify_Callback_View.as_view(), name="spotify_callback")
]