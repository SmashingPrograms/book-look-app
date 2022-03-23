from rest_framework import serializers
from .models import *


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class FilterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filter
        fields = '__all__'

class SignalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Signal
        fields = '__all__'

class RewardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reward
        fields = '__all__'