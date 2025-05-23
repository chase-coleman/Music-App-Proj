from django.urls import path
from .views import User_Info, Sign_Up, Login, Logout, DeleteAccount

urlpatterns = [
  path('info/', User_Info.as_view(), name="user_info"),
  path('', User_Info.as_view(), name="edit"),
  path('signup/', Sign_Up.as_view(), name="sign_up"),
  path('login/', Login.as_view(), name="login"),
  path('logout/', Logout.as_view(), name="logout"),
  path('delete/', DeleteAccount.as_view(), name='account_delete')
]