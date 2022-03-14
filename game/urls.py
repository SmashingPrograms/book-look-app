from django.urls import path
from .views import *

app_name = 'game'

urlpatterns = [
    path('test', TestAPIView.as_view(), name='test'),
    path('books', BookList.as_view(), name='booklist'),
    path('books/<int:books>', BookChangeAPIView.as_view()),
    # path('books/<int:pk>/passages', PassageList.as_view()),
    path('filters', FilterList.as_view(), name='filterlist'),
]

# add more urlpatterns based on repetitive task
for difficulty in range(1, 10):
    urlpatterns.append(path(f'books/<int:books>/{difficulty}/passages', PassageList.as_view()))
    urlpatterns.append(path(f'books/<int:books>/{difficulty}/passages/<int:pk>', PassageChangeAPIView.as_view()))