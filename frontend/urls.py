from django.urls import path

# from . import views
from .views import IndexView

app_name = 'frontend'

urlpatterns = [
  path('', IndexView.as_view(), name='index'),
]