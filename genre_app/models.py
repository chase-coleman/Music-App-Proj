from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator
from django.db import models
# Create your models here.
class Genre(models.Model):
  name = models.CharField(max_length=25, unique=True, null=False, blank=False)
  description = models.CharField(max_length=255, null=True, default="This genre hasn't been given a description yet.")
  # albums field is created by Albums model as "albums" MtM
  # songs field is created by the Song model as "songs" MtM
  # artists field is created by the Artist model as "artists"
