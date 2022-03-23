from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
  pass


class Profile(models.Model):
  user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
  # username = models.TextField(blank=True, null=True, default=self.__str__)
  bio = models.TextField(blank=True, null=True)
  points = models.IntegerField(default=0)
  avatar = models.ImageField(upload_to='profiles/', default='profiles/default-user.png')
  rewards = models.JSONField(blank=True, null=True)

  def __str__(self):
    return self.user.username