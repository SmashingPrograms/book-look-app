from django.urls import path

from .views import ProfileListAPIView

urlpatterns = [
  path('profiles/', ProfileListAPIView.as_view())
]