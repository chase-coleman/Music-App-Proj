from django.urls import path
from .views import User_Info, Sign_Up, Login

urlpatterns = [
  path('info/', User_Info.as_view(), name="user_info"),
  path('signup/', Sign_Up.as_view(), name="sign_up"),
  path('login/', Login.as_view(), name="login")
]