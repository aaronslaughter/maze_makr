from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

urlpatterns = [
    path('users/', views.UserList.as_view(), name='user_list'),
    path('users/<int:pk>', views.UserDetail.as_view(), name='user_detail'),
    path('mazes/', views.MazeList.as_view(), name='maze_list'),
    path('mazes/<int:pk>', views.MazeDetail.as_view(), name='maze_detail'),
]