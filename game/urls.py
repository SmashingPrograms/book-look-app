from django.urls import path
from .views import *

app_name = 'game'

urlpatterns = [
    path('books/<int:pk>/', BookAPIView.as_view()),
    path('books/', BookList.as_view(), name='booklist'),
    path('signal/', SignalList.as_view()),
    path('filters/', FilterList.as_view(), name='filterlist'),
]

# add more urlpatterns based on repetitive task
# for difficulty in range(1, 10):
#     urlpatterns.append(path(f'books/<int:pk>/{difficulty}/passages', PassageList.as_view()))
#     # urlpatterns.append(path(f'books/<int:book_id>/{difficulty}/passages/<int:pk>', PassageAPIView.as_view()))