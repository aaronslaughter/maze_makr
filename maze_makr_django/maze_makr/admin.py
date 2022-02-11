from django.contrib import admin

# Register your models here.
from .models import User, Maze

admin.site.register(User)
admin.site.register(Maze)