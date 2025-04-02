from django.contrib import admin
from django.urls import path, include 
from django.http import HttpResponse, HttpRequest

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/users/', include('user_app.urls')), # direct's django to the User.urls file
    path('api/v1/playlists/', include('playlist_app.urls')), # direct's django to Playlist.urls file
    # path('api/v1/artists/', include('artist_app.urls')), # direct's django to the Artist.urls file
    # path('api/v1/albums/', include('album_app.urls')), # direct's django to the Album.urls file
    # path('api/v1/songs/', include('song_app.urls')), # direct's django to the Song.urls file
    # path('api/v1/genres/', include('genre_app.urls')), # direct's django to the Genre.urls file
]
