from django.shortcuts import render
from rest_framework import generics
from .serializers import UserSerializer, MazeSerializer
from .models import User, Maze
from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
import os

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


class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()
