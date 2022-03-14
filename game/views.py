from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *
from .backend_scripts.gutenberg_pull import gutenberg_pull

def simplify_title(title):
  title = title.lower()

  chars_to_simplify = [
    " ",
    "_",
    "—",
    ":",
    ";",
  ]

  chars_to_remove = [
    "?",
    "!",
    ".",
    "$",
  ]

  for char in chars_to_simplify:
    title = title.replace(char, "-")
  
  for char in chars_to_remove:
    title = title.replace(char, "")

  title = title.replace("&", "and")

  return title


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
      # print(dict(self.request.data))
      book = dict(self.request.data)
      # Simplify the title, to match it to the book text easily later
      title = self.request.data["title"]
      simplified_title = simplify_title(title)
      print(simplified_title)
      serializer.save(simple_title=simplified_title)
      print("Got past simple title")
      gutenberg_pull(book, simplified_title)
      print("Got past Gutenberg")
  
class BookChangeAPIView(generics.RetrieveUpdateDestroyAPIView):
  # permission_classes = (IsAdminUser,)
  queryset = Book.objects.all()
  serializer_class = BookSerializer

class FilterList(generics.ListCreateAPIView):
    queryset = Filter.objects.all()
    serializer_class = FilterSerializer