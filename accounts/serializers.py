from django.forms import models
from rest_framework import serializers
from .models import Profile
from rest_auth.serializers import UserDetailsSerializer, TokenSerializer, TokenModel

class ProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = Profile
    fields = ('__all__')

class UserDetailsSerializer(UserDetailsSerializer):
  class Meta(UserDetailsSerializer.Meta):
    fields = UserDetailsSerializer.Meta.fields + ('is_superuser',)

# class UserSerializer(UserDetailsSerializer):

#     bio = serializers.TextField(source="profile.bio")
#     avatar = serializers.ImageField(source="profile.avatar")
#     points = serializers.IntegerField(source="profile.points")
#     rewards = serializers.JSONField(source="profile.rewards")

#     class Meta(UserDetailsSerializer.Meta):
#         fields = UserDetailsSerializer.Meta.fields + ('__all__')

#     def update(self, instance, validated_data):
#         profile_data = validated_data.pop('profile', {})
#         bio = profile_data.get("bio")
#         avatar = profile_data.get("avatar")
#         points = profile_data.get("points")
#         rewards = profile_data.get("rewards")

#         instance = super(UserSerializer, self).update(instance, validated_data)

#         # get and update user profile
#         profile = instance.profile
#         profile.bio = bio
#         profile.avatar = avatar
#         profile.points = points
#         profile.rewards = rewards
#         profile.save()

#         return instance

class TokenSerializer(TokenSerializer):
  username = serializers.ReadOnlyField(source='user.username')
  is_superuser = serializers.ReadOnlyField(source='user.is_superuser',)
  profile = ProfileSerializer(source='user.profile', read_only=True)

  class Meta(TokenSerializer.Meta):
    model = TokenModel
    fields = TokenSerializer.Meta.fields + ('is_superuser', 'username', 'profile')