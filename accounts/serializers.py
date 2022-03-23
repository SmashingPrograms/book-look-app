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

# from rest_framework import serializers
# from rest_auth.serializers import UserDetailsSerializer

# class UserSerializer(UserDetailsSerializer):

#     avatar = serializers.ImageField(source="userprofile.company_name")

#     class Meta(UserDetailsSerializer.Meta):
#         fields = UserDetailsSerializer.Meta.fields + ('company_name',)

#     def update(self, instance, validated_data):
#         profile_data = validated_data.pop('userprofile', {})
#         company_name = profile_data.get('company_name')

#         instance = super(UserSerializer, self).update(instance, validated_data)

#         # get and update user profile
#         profile = instance.userprofile
#         if profile_data and company_name:
#             profile.company_name = company_name
#             profile.save()
#         return instance

class TokenSerializer(TokenSerializer):
  username = serializers.ReadOnlyField(source='user.username')
  is_superuser = serializers.ReadOnlyField(source='user.is_superuser',)
  profile = ProfileSerializer(source='user.profile', read_only=True)

  class Meta(TokenSerializer.Meta):
    model = TokenModel
    fields = TokenSerializer.Meta.fields + ('is_superuser', 'username', 'profile')