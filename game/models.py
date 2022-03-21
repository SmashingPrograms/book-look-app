from django.db import models

# Create your models here.

# class Test(models.Model):
#     signal = models.TextField()

#     def __str__(self):
#         return self.text

class Book(models.Model):
    title = models.TextField()
    simple_title = models.TextField(blank=True)
    author = models.TextField()
    year = models.IntegerField()
    genre = models.TextField()
    url = models.URLField()
    start = models.TextField()
    end = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.title

# class Passage(models.Model):
#     book = models.ForeignKey(Book, on_delete=models.CASCADE)
#     difficulty = models.IntegerField(null=True)
#     passage = models.TextField()
#     passage_num = models.IntegerField(null=True)
#     usable = models.BooleanField()
#     unusability_desc = models.TextField(blank=True)

#     def __str__(self):
#         return self.book.title

class Filter(models.Model):
    string = models.TextField()
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.string

class Signal(models.Model):
    difficulty = models.IntegerField(blank=True)
    genre = models.TextField(blank=True, null=True)
    author = models.TextField(blank=True, null=True)
    prompt_passage = models.TextField(blank=True, null=True)
    expected_words = models.JSONField(blank=True, null=True)
    word_choices = models.JSONField(blank=True, null=True)
    passage_before = models.TextField(blank=True, null=True)
    passage_after = models.TextField(blank=True, null=True)
    book_title = models.TextField(blank=True, null=True)
    book_author = models.TextField(blank=True, null=True)
    book_year = models.IntegerField(blank=True, null=True)
    book_genre = models.TextField(blank=True, null=True)

    def __str__(self):
        return "Signal"

# The Odyssey
# The Iliad