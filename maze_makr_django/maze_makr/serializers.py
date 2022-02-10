from rest_framework import serializers
from .models import Maze

class MazeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
      model = Maze
      fields = ('id', 'name', 'height', 'width', 'maze')