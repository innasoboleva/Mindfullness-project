from django.db import models
from django.contrib.auth.models import User
from datetime import date, timedelta


class UserTokenJWT(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    refresh_token = models.CharField(max_length=255)


class Subscription(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='subscription')
    paid_subscription = models.BooleanField(default=False)
    subscription_start_date = models.DateField(null=True, blank=True)
    subscription_end_date = models.DateField(null=True, blank=True)

    @classmethod
    def create_subscription(cls, user, active=False, date=None):
        end_date = date + timedelta(days=30)
        return cls(user=user, paid_subscription=active, subscription_start_date=date, subscription_end_date=end_date)

    def update_subscription(self):
        if self.pk:
            self.paid_subscription = True
            self.subscription_start_date = date.today()
            self.subscription_end_date = self.subscription_start_date + timedelta(days=30)
            self.save()
        else:
            new_subscription = Subscription.create_subscription(user=self.user, active=True, date=date.today())
            new_subscription.save()
    
    def cancel_subscription(self):
        self.paid_subscription = False
        self.subscription_end_date = None
        self.subscription_start_date = None
        self.save()

    def __str__(self):
        return f"{self.email} - Paid Subscription: {self.paid_subscription}"
