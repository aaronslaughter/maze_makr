from time import strftime
from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import jwt
from datetime import datetime, timedelta
from django.conf import settings

# Create your models here.

#################
# UserManager and User classes were written borrowing heavily from:
#   thinkster.io/tutorials/django-json-api/authentication
#################

class UserManager(BaseUserManager):
  def create_user(self, username, password=None):
    if username is None:
      raise TypeError('Missing username')

    user = self.model(username=username)
    user.set_password(password)
    user.save()

    return user

  def create_superuser(self, username, password):
    if password is None:
      raise TypeError('Missing password')

    user = self.create_user(username, password)
    user.is_superuser = True
    user.is_staff = True
    user.save()

    return user


class User(AbstractBaseUser, PermissionsMixin):
  username = models.CharField(max_length=100, unique=True, default='')
  is_staff = models.BooleanField(default=False)

  USERNAME_FIELD = 'username'

  objects = UserManager()

  def __str__(self):
    return self.username

  def token(self):
    return self._generate_jwt_token()

  def _generate_jwt_token(self):

    dt = datetime.now() + timedelta(days=10)

    token = jwt.encode({
      'id': self.pk,
      'exp': int(dt.strftime('%s'))
    }, settings.SECRET_KEY, algorithm='HS256')

    return token.decode('utf-8')
  


class Maze(models.Model):
  # user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mazes')
  name = models.CharField(max_length=100)
  height = models.IntegerField(default=3)
  width = models.IntegerField(default=3)
  maze = ArrayField(
      models.BooleanField()
  )

  def __str__(self):
    return self.name
