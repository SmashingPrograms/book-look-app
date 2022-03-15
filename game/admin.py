from django.contrib import admin
from .models import Test, Book, Passage

# Register your models here.

admin.site.register(Book)
admin.site.register(Test)
admin.site.register(Passage)