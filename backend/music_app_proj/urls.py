from django.contrib import admin
from django.urls import path, include 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/users/', include('user_app.urls')), # direct's django to the User.urls file
    path('api/v1/genres/', include('genre_app.urls')), # direct's django to the Genre.urls file
    path('api/v1/playlists/', include('playlist_app.urls')), # direct's django to Playlist.urls file
    path('api/v1/auth/spotify/callback/', include('spotify_auth.urls')), # app for spotify callback regarding user authorizations
    path('api/v1/tracks/', include('track_app.urls')) #direct's django to Tracks.urls
    # TO BE ADDED
    # path('api/v1/artists/', include('artist_app.urls')), # direct's django to the Artist.urls file
    # path('api/v1/albums/', include('album_app.urls')), # direct's django to the Album.urls file
]
