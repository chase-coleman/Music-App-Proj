from django.urls import path 
from .views import All_artists 

urlpatterns = [
  path('all/', All_artists.as_view(), name="all_artists")
]