from django.urls import path
from .views import *

app_name = 'game'

urlpatterns = [
    path('test', TestAPIView.as_view(), name='test'),
    path('books', BookList.as_view(), name='booklist'),
    path('books/<int:pk>', BookChangeAPIView.as_view()),
    path('filters', FilterList.as_view(), name='filterlist'),
]