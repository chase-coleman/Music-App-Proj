from django.contrib import admin
from django.urls import path, include 
from django.http import HttpResponse, HttpRequest

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/users/', include('user_app.urls')) # direct's django to the User_app urls file
]
