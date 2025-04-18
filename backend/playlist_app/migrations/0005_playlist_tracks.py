# Generated by Django 5.1.7 on 2025-04-13 21:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('playlist_app', '0004_playlist_normalized_name'),
        ('track_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='playlist',
            name='tracks',
            field=models.ManyToManyField(blank=True, related_name='playlists', to='track_app.track'),
        ),
    ]
