from django.urls import path 
from .views import All_genres 

urlpatterns = [
  path('all/', All_genres.as_view(), name="all_genres")
]