from rest_framework import serializers
from .models import User, Maze

class MazeSerializer(serializers.HyperlinkedModelSerializer):

  user_id = serializers.PrimaryKeyRelatedField(
    queryset=User.objects.all(),
    source='user'
  )

  class Meta:
    model = Maze
    fields = ('id', 'name', 'height', 'width', 'maze', 'user_id')

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    depth = 1
    fields = ('id', 'username', 'mazes')