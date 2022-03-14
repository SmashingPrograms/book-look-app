from django.db import models

# Create your models here.

class Test(models.Model):
    signal = models.TextField()

    def __str__(self):
        return self.text

class Book(models.Model):
    title = models.TextField()
    simple_title = models.TextField(blank=True)
    author = models.TextField()
    year = models.IntegerField()
    genre = models.TextField()
    url = models.TextField()
    start = models.TextField()
    end = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.text

class Filter(models.Model):
    string = models.TextField()
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.text


# The Odyssey
# The Iliad
# 