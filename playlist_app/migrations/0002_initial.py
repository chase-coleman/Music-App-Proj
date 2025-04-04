# Generated by Django 5.1.7 on 2025-04-04 01:01

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('playlist_app', '0001_initial'),
        ('song_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='playlist',
            name='songs',
            field=models.ManyToManyField(related_name='playlists', to='song_app.song'),
        ),
    ]
