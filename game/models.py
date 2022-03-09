from django.db import models

# Create your models here.

class Test(models.Model):
    signal = models.TextField()

    def __str__(self):
        return self.text