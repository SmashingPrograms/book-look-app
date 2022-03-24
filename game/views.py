from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *
from .backend_scripts.gutenberg_pull import gutenberg_pull
from .backend_scripts.create_passages import create_passages
from .backend_scripts.generate_question import generate_question
import urllib
from urllib import request, parse
import json
import random
import sys
from django.forms.models import model_to_dict
from rest_framework.permissions import IsAdminUser
from .permissions import IsAdminOrReadyOnly
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
    "'",
  ]

  for char in chars_to_simplify:
    title = title.replace(char, "-")
  
  for char in chars_to_remove:
    title = title.replace(char, "")

  title = title.replace("&", "and")

  return title

class BookList(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAdminOrReadyOnly]
    
    def perform_create(self, serializer):
      book = dict(self.request.data)
      title = self.request.data["title"]
      simplified_title = simplify_title(title)
      serializer.save(simple_title=simplified_title)

      host_name = self.request.META['HTTP_HOST']
      url = f"http://{host_name}/api/v1/books"
      with urllib.request.urlopen(url) as response:
        books = json.loads(response.read())
        book_id = books[len(books)-1]['id']

      gutenberg_pull(book, simplified_title)


  # def get_queryset(self):
  #   book_id = self.kwargs['book_id']
  #   return Book.objects.filter(id=book_id)

    # def perform_create(self, serializer):
    #   print("sdaogasodkgksoadgkosdkogoksdkof")

    # https://stackoverflow.com/questions/9143262/delete-multiple-objects-in-django

    # def perform_destroy(self, serializer):
    #   self.objects.all().delete()


# ListAPIView works, but doesn't let you delete
class BookAPIView(generics.RetrieveUpdateDestroyAPIView):
  permission_classes = [IsAdminOrReadyOnly]
  queryset = Book.objects.all()
  serializer_class = BookSerializer

  def perform_update(self, serializer):
    book = dict(self.request.data)
    title = self.request.data["title"]
    simplified_title = simplify_title(title)
    serializer.save(simple_title=simplified_title)

    gutenberg_pull(book, simplified_title)

  # def perform_destroy(self, serializer):



# class PassageAPIView(generics.RetrieveUpdateDestroyAPIView):
#   # permission_classes = (IsAdminUser,)
#   queryset = Passage.objects.all()
#   serializer_class = PassageSerializer

class FilterList(generics.ListCreateAPIView):
    queryset = Filter.objects.all()
    serializer_class = FilterSerializer

class FilterAPIView(generics.RetrieveUpdateDestroyAPIView):
  queryset = Filter.objects.all()
  serializer_class = FilterSerializer

class SignalList(generics.ListCreateAPIView):
    queryset = Signal.objects.all()
    serializer_class = SignalSerializer

    def perform_create(self, serializer):
      Signal.objects.all().delete()
      host_name = self.request.META['HTTP_HOST']
      difficulty = self.request.data["difficulty"]
      filters = [ model_to_dict(filter)["string"] for filter in list(Filter.objects.all()) ]
      print("filters are, ", filters)
      books = [ model_to_dict(book) for book in list(Book.objects.all()) ]
      book = random.choice(books)
      # for bookIt in books:
      #   if bookIt["simple_title"] == "the-emancipation-proclamation":
      #     book = bookIt
      while 1:
        prompt = generate_question(host_name, book, difficulty, filters)
        print(prompt, "is prompt")
        if prompt[1] == "" or len(prompt[2]) < 12:
          print("Not enough expected words to continue. Retrying...")
          continue
          # sys.exit()
        else:
          break
          # break
      prompt_passage = prompt[0]
      expected_words = prompt[1]
      word_choices = prompt[2]
      passage_before = prompt[3]
      passage_after = prompt[4]
      book_title = book["title"]
      book_author = book["author"]
      book_year = book["year"]
      book_genre = book["genre"]

      serializer.save(prompt_passage=prompt_passage, expected_words=expected_words, word_choices=word_choices, passage_before=passage_before, passage_after=passage_after, book_title=book_title, book_author=book_author, book_year=book_year, book_genre=book_genre)
        # else:
        

        # for passage in passages:
        #   passage["book"] = book_id
        #   passage_serializer = PassageSerializer(data=passage)
        #   passage_serializer.is_valid()
        #   passage_serializer.save()

    def perform_update(self, serializer):
      pass

class RewardList(generics.ListCreateAPIView):
    queryset = Reward.objects.all()
    serializer_class = RewardSerializer

class RewardAPIView(generics.RetrieveUpdateDestroyAPIView):
  queryset = Reward.objects.all()
  serializer_class = RewardSerializer