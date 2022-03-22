from django.forms import models
from rest_framework import serializers
from .models import Profile
from rest_auth.serializers import UserDetailsSerializer, TokenSerializer, TokenModel

class ProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = Profile
    fields = ('id', 'user', 'avatar')

class UserDetailsSerializer(UserDetailsSerializer):
  class Meta(UserDetailsSerializer.Meta):
    fields = UserDetailsSerializer.Meta.fields + ('is_superuser',)

class TokenSerializer(TokenSerializer):
  is_superuser = serializers.ReadOnlyField(source='user.is_superuser',)
  class Meta(TokenSerializer.Meta):
    model = TokenModel
    fields = TokenSerializer.Meta.fields + ('is_superuser',)