# Generated by Django 5.1.7 on 2025-04-04 01:01

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('artist_app', '__first__'),
        ('genre_app', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Album',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=100)),
                ('description', models.CharField(default="This album hasn't been given a description yet.", max_length=255, null=True)),
                ('artist', models.ManyToManyField(related_name='albums', to='artist_app.artist')),
                ('genres', models.ManyToManyField(related_name='albums', to='genre_app.genre')),
            ],
        ),
    ]
