from django.urls import include, path

urlpatterns = [
  path('',include('accounts.urls')),
  path('',include('game.urls')),
]