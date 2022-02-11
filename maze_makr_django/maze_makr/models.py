from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.

class User(models.Model):
  username = models.CharField(max_length=100)

  def __str__(self):
    return self.username

class Maze(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, default='', related_name='mazes', null=True)
  name = models.CharField(max_length=100)
  height = models.IntegerField(default=3)
  width = models.IntegerField(default=3)
  maze = ArrayField(
    models.BooleanField()
  )

  def __str__(self):
    return self.name