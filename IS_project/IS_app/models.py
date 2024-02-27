from django.db import models
from django.contrib.auth.models import User
from datetime import date


class UserTokenJWT(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    refresh_token = models.CharField(max_length=255)


class Subscription(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='subscription')
    paid_subscription = models.BooleanField(default=False)
    subscription_start_date = models.DateField(null=True, blank=True)

    @classmethod
    def create_subscription(cls, user, active=False, date=None):
        return cls(user=user, paid_subscription=active, subscription_start_date=date)

    def update_subscription(self, user_email):
        user = User.objects.get(email=user_email)
        try:
            user_subscription = Subscription.objects.get(user=user)
            user_subscription.paid_subscription = True
            user_subscription.subscription_start_date = date.today()
            user_subscription.save()
        except Subscription.DoesNotExist:
            # If the subscription doesn't exist for the user, create a new one
            user_subscription = Subscription.create_subscription(user=user, active=True, date=date.today())
            user_subscription.save()

    def __str__(self):
        return f"{self.email} - Paid Subscription: {self.paid_subscription}"
