from rest_framework import serializers
from .models import User, Maze

class MazeSerializer(serializers.HyperlinkedModelSerializer):
  # user = serializers.HyperlinkedRelatedField(
  #   view_name='user_detail',
  #   read_only=True
  # )

  # user_id = serializers.PrimaryKeyRelatedField(
  #   queryset=User.objects.all(),
  #   source='username'
  # )

  class Meta:
    model = Maze
    fields = ('id', 'name', 'height', 'width', 'maze')

class UserSerializer(serializers.HyperlinkedModelSerializer):
  # mazes = serializers.HyperlinkedRelatedField(
  #   view_name='maze_detail',
  #   many=True,
  #   read_only=True
  # )

  mazes = MazeSerializer(many=True)

  # mazes = serializers.PrimaryKeyRelatedField(
  #   queryset=Maze.objects.all(),
  #   many=True
  # )

  class Meta:
    model = User
    depth = 1
    fields = ('id', 'username', 'mazes')