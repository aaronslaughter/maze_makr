from rest_framework import serializers
from .models import User, Maze

class MazeSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Maze
    fields = ('id', 'name', 'height', 'width', 'maze')

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    depth = 1
    fields = ('id', 'username', 'mazes')