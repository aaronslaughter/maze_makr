from rest_framework import serializers
from .models import User, Maze

#################
# RegistrationSerializer written borrowing heavily from:
#   thinkster.io/tutorials/django-json-api/authentication
#################

class RegistrationSerializer(serializers.ModelSerializer):
  password = serializers.CharField(max_length=128, min_length=8, write_only=True)
  token = serializers.CharField(max_length=255, read_only=True)

  class Meta:
    model = User
    fields = ['id', 'username', 'last_login', 'is_staff', 'is_superuser','password', 'token']
  
  def create(self, validated_data):
    return User.objects.create_user(**validated_data)

class UserSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'password', 'last_login', 'username')

class MazeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
      model = Maze
      fields = ('id', 'name', 'height', 'width', 'maze')