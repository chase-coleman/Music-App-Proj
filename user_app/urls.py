from django.urls import path
from .views import All_users

urlpatterns = [
  path('all/', All_users.as_view(), name="all_users"), # returns all users
  path('<str:username>/', All_users.as_view(), name="user_delete"), # deletes a user
  path('<str:username>/', All_users.as_view(), name="user_update"), # updates a user
]