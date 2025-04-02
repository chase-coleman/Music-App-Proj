from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator
from django.db import models
# Create your models here.
class Genre(models.Model):
  # TO DO : create field to connect to artists as ManyToManyField 
  # TO DO : create field to connect to albums as ManyToManyField 
  # TO DO : create field to connect to songs as ManyToManyField 
  name = models.CharField(max_length=25, unique=True, null=False, blank=False)
  description = models.CharField(max_length=255, null=True, default="This genre hasn't been given a description yet.")
  
