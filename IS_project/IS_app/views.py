from django.contrib.auth import authenticate
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.http import JsonResponse
import json
from django.core.serializers import serialize
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .models import Subscription, UserTokenJWT


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
    user = request.user
    if user.is_authenticated:
        firstname = user.first_name
        user_email = user.email
        return JsonResponse({'status': 'success', 'username': firstname, 'email': user_email})
    else:
        return JsonResponse({'status': 'error', 'message': 'User is not logged in.'})


@api_view(['POST'])
def login_user(request):
    if request.body:
        data = json.loads(request.body)
        email = data.get('email').lower()
        password = data.get('password')
        print(email)
        print(password)
        try:
            user = authenticate(username=email, password=password)
            if user is not None:
                refresh = RefreshToken.for_user(user)
                return JsonResponse({'status': 'success', 'access_token': str(refresh.access_token),
            })
            else:
                return JsonResponse({'status': 'error', 'message': 'Password doesn\'t match or User does not exist.'}) 
        except:
            return JsonResponse({'status': 'error', 'message': 'User does not exist or Password doesn\'t match.'})
    return JsonResponse({'status': 'error', 'message': 'No data sent for log in.'})


@api_view(['GET'])
def logout_user(request):
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


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def user_subscribed(request):
    user = request.user
    if user.is_authenticated:
        try:
            subscription = Subscription.objects.get(user=user)
            subscription.paid_subscription = active
            subscription.subscription_start_date = timezone.now() if active else None
            subscription.save()
        except Subscription.DoesNotExist:
            # If the subscription doesn't exist for the user, create a new one
            subscription = Subscription.create_subscription(user=user, active=active, date=timezone.now())
            subscription.save()

        return JsonResponse({'status': 'success'})
    else:
        return JsonResponse({'status': 'error', 'message': 'User not authenticated.'})

        return JsonResponse({'status': 'success'})



