from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegistrationSerializer, UserSerializer, MazeSerializer
from .models import Maze, User

# Create your views here.

#################
# RegistrationAPIView written borrowing heavily from:
#   thinkster.io/tutorials/django-json-api/authentication
#################

class RegistrationAPIView(APIView):
  permissions_classes = (AllowAny)
  serializer_class = RegistrationSerializer

  def post(self, request):
    user = request.data.get('user', {})
    serializer = self.serializer_class(data=user)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    return Response(serializer.data, status=status.HTTP_201_CREATED)

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