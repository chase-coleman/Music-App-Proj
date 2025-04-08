from django.urls import path
from .views import User_Info, Sign_Up

urlpatterns = [
  path('info/', User_Info.as_view(), name="user_info"),
  path('signup/', Sign_Up.as_view(), name="sign_up")
]