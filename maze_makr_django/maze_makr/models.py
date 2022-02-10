from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Maze(models.Model):
  name = models.CharField(max_length=100)
  height = models.IntegerField(default=3)
  width = models.IntegerField(default=3)
  maze = ArrayField(
      models.BooleanField()
  )

  def __str__(self):
    return self.name