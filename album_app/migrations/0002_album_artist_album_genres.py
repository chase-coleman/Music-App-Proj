# Generated by Django 5.1.7 on 2025-04-02 02:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('album_app', '0001_initial'),
        ('artist_app', '0003_artist_description'),
        ('genre_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='album',
            name='artist',
            field=models.ManyToManyField(related_name='albums', to='artist_app.artist'),
        ),
        migrations.AddField(
            model_name='album',
            name='genres',
            field=models.ManyToManyField(related_name='genres', to='genre_app.genre'),
        ),
    ]
