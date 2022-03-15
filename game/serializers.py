from rest_framework import serializers
from .models import *


class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class PassageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Passage
        fields = '__all__'

class FilterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filter
        fields = '__all__'

class SignalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Signal
        fields = '__all__'