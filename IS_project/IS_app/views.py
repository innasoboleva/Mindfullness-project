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
            # adding user to current session
            request.session['username'] = new_user.username
            request.session['email'] = new_user.email
            return JsonResponse({'status': 'success', 'username': username, 'email': email})
    
    return JsonResponse({'status': 'error', 'message': 'Error. Please check that all fields are correct.'})


@api_view(['GET'])
def get_user(request):
    username = request.session.get('username')
    user_email = request.session.get('email')
    if username and user_email:
        return JsonResponse({'status': 'success', 'username': username, 'email': user_email})
    
    return JsonResponse({'status': 'error', 'message': 'User is not logged in.'})


@api_view(['POST'])
def login_user(request):
    if request.body:
        data = json.loads(request.body)
        print(data)
        email = data.get('email')
        password = data.get('password')
        try:
            user = User.objects.get(email=email)
            print(user.password)
            if password == user.password:
                return JsonResponse({'status': 'success'})
            else:
                return JsonResponse({'status': 'error', 'message': 'Password doesn\'t match.'})
        except:
            return JsonResponse({'status': 'error', 'message': 'User does not exist.'})
    return JsonResponse({'status': 'error', 'message': 'No data sent for log in.'})


@api_view(['GET'])
def logout_user(request):
    request.session['username'] = None
    request.session['email'] = None
    return JsonResponse({'status': 'success'})

