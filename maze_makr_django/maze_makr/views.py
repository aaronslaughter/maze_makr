from django.shortcuts import render
from rest_framework import generics
from .serializers import MazeSerializer
from .models import Maze


# Create your views here.

class MazeList(generics.ListCreateAPIView):
    queryset = Maze.objects.all()
    serializer_class = MazeSerializer

class MazeDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Maze.objects.all()
  serializer_class = MazeSerializer