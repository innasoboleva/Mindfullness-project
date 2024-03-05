from django.contrib.auth import authenticate
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.http import JsonResponse
import json
from django.core.serializers import serialize
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .models import Subscription, UserTokenJWT, Post, Scheduler
from datetime import date

from django.conf import settings
from django.core.mail import send_mail


@api_view(['GET'])
def show_users(request):
    """
    For testing puposes -- checking BD data.
    """
    users = User.objects.all()
    serialized_users = serialize("json", users)
    
    subs = Subscription.objects.all()
    serialized_subs = serialize("json", subs)
    
    tokens = UserTokenJWT.objects.all()
    serialized_tokens = serialize("json", tokens)
    
    data = {
        'users': serialized_users,
        'subscriptions': serialized_subs,
        'tokens': serialized_tokens
    }
    
    return JsonResponse(data, safe=False)


@api_view(['POST'])
def create_user(request):
    """
    Creates new user, subscription (not active until paid).
    """
    if request.body:
        # Decoding the JSON data
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email').lower()
        password = data.get('password')
        # creating new user
        if username and email and password:
            # username is KEY in User, email is switched with username, and username is used as first name
            new_user = User.objects.create_user(username=email, email=email, first_name=username, password=password)
            new_user.save()
            new_subsciption = Subscription.create_subscription(new_user)
            new_subsciption.save()
            refresh = RefreshToken.for_user(new_user)
            
            print(new_user, password)
            return JsonResponse({'status': 'success', 'username': username, 'email': email, 'access_token': str(refresh.access_token)})
    
    return JsonResponse({'status': 'error', 'message': 'Error. Please check that all fields are correct.'})


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_user(request):
    """
    Function for checking if user is logged in and has paid subscription.
    """
    user = request.user
    if user.is_authenticated:
        firstname = user.first_name
        user_email = user.email
        subscription = Subscription.objects.get(user=user)
        return JsonResponse({'status': 'success', 'username': firstname, 'email': user_email, 'subscribed': subscription.paid_subscription })
    else:
        return JsonResponse({'status': 'error', 'message': 'User is not logged in.'})


@api_view(['POST'])
def login_user(request):
    """
    Login user. Returns JSON response which includes if user has paid subscription.
    """
    if request.body:
        data = json.loads(request.body)
        email = data.get('email').lower()
        password = data.get('password')
        print(email)
        print(password)
        try:
            user = authenticate(username=email, password=password)
            if user is not None:
                subscription = Subscription.objects.get(user=user)
                refresh = RefreshToken.for_user(user)
                return JsonResponse({'status': 'success', 'access_token': str(refresh.access_token), 'subscription': subscription.paid_subscription,
            })
            else:
                return JsonResponse({'status': 'error', 'message': 'Password doesn\'t match or User does not exist.'}) 
        except:
            return JsonResponse({'status': 'error', 'message': 'User does not exist or Password doesn\'t match.'})
    return JsonResponse({'status': 'error', 'message': 'No data sent for log in.'})


@api_view(['GET'])
def logout_user(request):
    """
    Function for loging out.
    """
    if request.user.is_authenticated:
        try:
            # Blacklist the refresh token
            refresh_token = request.COOKIES.get('refresh_token')
            if refresh_token:
                refresh_token = RefreshToken(refresh_token)
                refresh_token.blacklist()
            
            # Return success response
                return JsonResponse({'status': 'success'})
            else:
                return JsonResponse({'status': 'error', 'message': 'User didn\'t have refresh token.'})
        except:
            return JsonResponse({'status': 'error', 'message': 'Failed to logout.'})
    else:
        return JsonResponse({'status': 'error', 'message': 'User not authenticated.'})


def send_email(name, email):
    """
    Sends email using app generated password (via gmail).
    """
    try:
        subject = 'welcome to GFG world'
        message = f'Hi {name}, thank you for registering in Mindfullness club hosted by Irina Soboleva.'
        email_from = settings.EMAIL_HOST_USER
        recipient_list = ['nysik62@gmail.com', ] # CHANGE email to USER'S. TESTING PURPUSES ONLY
        send_mail( subject, message, email_from, recipient_list )
    except:
        print("Didn't send email.")


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def user_subscribed(request):
    """
    For updating user's subscription -- marking it as a paid one and active for 30 days starting the day it was paid.
    """
    user = request.user
    print('Subscribing...')
    if user.is_authenticated:
        try:
            subscription = Subscription.objects.get(user=user)
            subscription.update_subscription()
            print('Subscribed!')
             # sending welcoming email
            send_email(user.first_name, user.email)
            return JsonResponse({'status': 'success'})
        except Subscription.DoesNotExist:
            # If subscription doesn't exist
            new_subscription = Subscription.create_subscription(user=user, active=True, date=date.today())
            new_subscription.save()
            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)})
       
    else:
        return JsonResponse({'status': 'error', 'message': 'User not authenticated.'})
    

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_content(request):
    """
    Showing all posts that were made by owner. Only for logged in users.
    """
    posts = Post.objects.all()
    if posts:
        data = [{'id': post.pk, 'title': post.title, 'content': post.content, 'video_url': post.video_url} for post in posts]
        return JsonResponse({'status': 'success', 'data': data}, safe=False)
    return JsonResponse({'status': 'error', 'message': 'No posts yet.'})


@api_view(['GET'])
def get_scheduler(request):
    """
    Showing schedule that was made by owner in admin panel.
    """
    posts = Scheduler.objects.all()
    if posts:
        data = [{'id': post.pk, 'title': post.title, 'semi_title': post.semi_title, 'day': post.day, 'name': post.name, 'time': post.time, 'url': post.schedule_url} for post in posts]
        return JsonResponse({'status': 'success', 'data': data}, safe=False)
    return JsonResponse({'status': 'error', 'message': 'No schedule yet.'})


