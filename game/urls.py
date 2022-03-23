from django.urls import path
from .views import *

app_name = 'game'

urlpatterns = [
    path('books/', BookList.as_view(), name='booklist'),
    path('books/<int:pk>/', BookAPIView.as_view()),
    path('signal/', SignalList.as_view()),
    path('filters/', FilterList.as_view(), name='filterlist'),
    path('filters/<int:pk>/', FilterAPIView.as_view()),
    path('rewards/', RewardList.as_view(), name='rewardlist'),
    path('rewards/<int:pk>/', RewardAPIView.as_view()),
]