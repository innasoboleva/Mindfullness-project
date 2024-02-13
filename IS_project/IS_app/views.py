from django.contrib.auth.models import User
# from django.shortcuts import render
from rest_framework.decorators import api_view
# from rest_framework.response import Response
from django.http import JsonResponse
import json
from django.core.serializers import serialize
from .models import Subscription


@api_view(['GET', 'POST'])
def index(request):
    data = {
        'page': 1,
        'status': 'success'
    }
    return JsonResponse(data)


@api_view(['GET'])
def show_users(request):
    users = User.objects.all()
    serialized_users = serialize("json", users)
    print(serialized_users)

    print('---SUB-----')
    print(Subscription.objects.all())
    print('---END-----')
    return JsonResponse(serialized_users, safe=False)


@api_view(['POST'])
def create_user(request):
    if request.body:
        # Decoding the JSON data
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        # creating new user
        if username and email and password:
            new_user = User.objects.create_user(username=username, email=email, password=password)
            new_user.save()
            new_subsciption = Subscription.create_subscription(new_user)
            new_subsciption.save()
            print(new_user)
            return JsonResponse({'status': 'success'})
    
    return JsonResponse({'status': 'error', 'message': 'Error. Please check that all fields are correct.'})
   