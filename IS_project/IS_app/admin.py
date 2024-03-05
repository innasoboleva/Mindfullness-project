from django.contrib import admin
from .models import Subscription, Post, Scheduler

admin.site.register(Subscription)
admin.site.register(Post)
admin.site.register(Scheduler)
