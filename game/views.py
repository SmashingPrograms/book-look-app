from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *
from .backend_scripts.gutenberg_pull import gutenberg_pull
from .backend_scripts.create_passages import create_passages
import urllib
from urllib import request, parse
import json
# from django.contrib.sites.shortcuts import get_current_site

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
    ",",
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
      host_name = self.request.META['HTTP_HOST']
      # Simplify the title, to match it to the book text easily later
      title = self.request.data["title"]
      simplified_title = simplify_title(title)
      serializer.save(simple_title=simplified_title)

      url = f"http://{host_name}/api/v1/books"
      with urllib.request.urlopen(url) as response:
        books = json.loads(response.read())
        book_id = books[len(books)-1]['id']

      gutenberg_pull(book, simplified_title)
      # print("Got past Gutenberg")
      passages = create_passages(book, host_name, simplified_title)

      for difficulty in range(1, 10):
        passages_to_add = [ passage for passage in passages if passage['difficulty'] == difficulty ]
        print(passages_to_add)
        url = f"http://{host_name}/api/v1/books/{book_id}/{difficulty}/passages"
        for passage in passages_to_add:
          print("DID I EVEN GET HERE?")
          print(passage)
          data = json.dumps(passage).encode()
          req = request.Request(url, data=data)
          resp = request.urlopen(req)

      # for i in passages:
      #   for difficulty in difficulties:

        # PassageList.perform_create(ksdkgoksadgkosdoo)

  
class PassageList(generics.ListCreateAPIView):
    queryset = Passage.objects.all()
    serializer_class = PassageSerializer

    # def perform_create(self, serializer):
    #   print("sdaogasodkgksoadgkosdkogoksdkof")

    # https://stackoverflow.com/questions/9143262/delete-multiple-objects-in-django

    def perform_destroy(self, serializer):
      self.objects.all().delete()

class PassageChangeAPIView(generics.RetrieveUpdateDestroyAPIView):
  queryset = Passage.objects.all()
  serializer_class = PassageSerializer

  # def perform_create(self, serializer):
  #   print("sdaogasodkgksoadgkosdkogoksdkof")

  # https://stackoverflow.com/questions/9143262/delete-multiple-objects-in-django

  def perform_destroy(self, serializer):
    PassageList.objects.all().delete()


class BookChangeAPIView(generics.RetrieveUpdateDestroyAPIView):
  # permission_classes = (IsAdminUser,)
  queryset = Book.objects.all()
  serializer_class = BookSerializer

class PassageChangeAPIView(generics.RetrieveUpdateDestroyAPIView):
  # permission_classes = (IsAdminUser,)
  queryset = Passage.objects.all()
  serializer_class = PassageSerializer

class FilterList(generics.ListCreateAPIView):
    queryset = Filter.objects.all()
    serializer_class = FilterSerializer