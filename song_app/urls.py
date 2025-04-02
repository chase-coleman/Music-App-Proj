from django.urls import path 
from .views import All_songs 

urlpatterns = [
  path('all/', All_songs.as_view(), name="all_songs")
]