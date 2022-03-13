from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *

class TestAPIView(generics.ListCreateAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer
    
    def perform_create(self, serializer):
      reversed = self.request.data["signal"][::-1]
      serializer.save(signal=reversed)

class BookList(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    # def perform_create(self, serializer):
    #   # serializer.save(signal=reversed)
    #   pass
    
    def perform_create(self, serializer):
      # serializer.save(signal=reversed)
      print(dict(self.request.data))
      serializer.save()
  
class BookChangeAPIView(generics.RetrieveUpdateDestroyAPIView):
  # permission_classes = (IsAdminUser,)
  queryset = Book.objects.all()
  serializer_class = BookSerializer

class FilterList(generics.ListCreateAPIView):
    queryset = Filter.objects.all()
    serializer_class = FilterSerializer