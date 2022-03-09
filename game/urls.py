from django.urls import path
from .views import TestAPIView

app_name = 'game'

urlpatterns = [
    path('', TestAPIView.as_view(), name='test')
]