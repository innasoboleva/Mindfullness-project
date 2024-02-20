from django.contrib.auth import authenticate
from django.contrib.auth.models import User
# from django.shortcuts import render
from rest_framework.decorators import api_view
# from rest_framework.response import Response
from django.http import JsonResponse
import json
from django.core.serializers import serialize
from .models import Subscription

import requests

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
    print('---SUB-----')
    subs = Subscription.objects.all()
    serialized_subs = serialize("json", subs)
    print(serialized_subs)
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
            # username is KEY in User, email is switched with username, and username is used as first name
            new_user = User.objects.create_user(username=email, email=email, first_name=username, password=password)
            new_user.save()
            new_subsciption = Subscription.create_subscription(new_user)
            new_subsciption.save()
            print(new_user)
            # adding user to current session
            request.session['firstname'] = new_user.first_name
            request.session['email'] = new_user.email
            request.session.modified = True
            
            return JsonResponse({'status': 'success', 'username': username, 'email': email})
    
    return JsonResponse({'status': 'error', 'message': 'Error. Please check that all fields are correct.'})


@api_view(['GET'])
def get_user(request):
    firstname = request.session.get('firstname')
    user_email = request.session.get('email')
   
    if firstname and user_email:
        print('User is logged in')
        return JsonResponse({'status': 'success', 'username': firstname, 'email': user_email})
    print('User is not logged in')
    return JsonResponse({'status': 'error', 'message': 'User is not logged in.'})


@api_view(['POST'])
def login_user(request):
    if request.body:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        try:
            user = authenticate(username=email, password=password)
            if user is not None:
                request.session['firstname'] = user.first_name
                request.session['email'] = email
               
                return JsonResponse({'status': 'success'})
            else:
                return JsonResponse({'status': 'error', 'message': 'Password doesn\'t match.'}) 
        except:
            return JsonResponse({'status': 'error', 'message': 'User does not exist.'})
    return JsonResponse({'status': 'error', 'message': 'No data sent for log in.'})


@api_view(['GET'])
def logout_user(request):
    request.session.flush()
    # Delete the session cookie from the browser
    response = JsonResponse({'status': 'success'})
    response.delete_cookie('user_session')
    response.set_cookie('user_session', '', samesite='None', secure=True)
    return response

