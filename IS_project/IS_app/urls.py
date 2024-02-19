from django.urls import path
from . import views

urlpatterns = [
    path('api/', views.index, name='api'),
    path('api/create_new_user', views.create_user, name='create_user'),
    path('api/logout', views.logout_user, name='logout'),
    path('api/login', views.login_user, name='login'),
    path('users/', views.show_users, name='show_users'),
]