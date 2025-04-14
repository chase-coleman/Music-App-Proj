from django.urls import path
from .views import Tracks

urlpatterns = [
  path('', Tracks.as_view(), name="tracks"),
]

