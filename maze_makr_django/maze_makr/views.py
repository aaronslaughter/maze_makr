from django.shortcuts import render
from rest_framework import generics
from .serializers import UserSerializer, MazeSerializer
from .models import User, Maze


# Create your views here.

class UserList(generics.ListCreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer

class MazeList(generics.ListCreateAPIView):
    queryset = Maze.objects.all()
    serializer_class = MazeSerializer

class MazeDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Maze.objects.all()
  serializer_class = MazeSerializer