from django.urls import path

from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
  path('profiles/', ProfileListAPIView.as_view()),
  path('profiles/<int:pk>/', ProfileAPIView.as_view()),
]
# + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)