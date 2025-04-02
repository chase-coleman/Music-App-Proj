from django.urls import path
from .views import All_users

urlpatterns = [
  path('all/', All_users.as_view(), name="all_users")
]