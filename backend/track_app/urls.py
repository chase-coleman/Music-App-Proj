from django.urls import path
from .views import Tracks

urlpatterns = [
  path('', Tracks.as_view(), name="tracks"),
  path('<int:playlist_id>/', Tracks.as_view(), name="tracks")
]

