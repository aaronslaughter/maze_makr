from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

urlpatterns = [
    path('mazes/', views.MazeList.as_view(), name='maze_list'),
    path('mazes/<int:pk>', views.MazeDetail.as_view(), name='maze_detail'),
]