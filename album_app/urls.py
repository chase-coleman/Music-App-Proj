from django.urls import path
from .views import All_albums

urlpatterns = [
  path('all/', All_albums.as_view(), name="all_albums"),
]
