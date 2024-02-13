from django.urls import path
from . import views

urlpatterns = [
    path('api/', views.index, name='api'),
    path('api/create_new_user', views.create_user, name='create_user'),
    path('users/', views.show_users, name='show_users'),
]