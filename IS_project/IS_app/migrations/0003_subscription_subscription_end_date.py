# Generated by Django 4.2.10 on 2024-03-03 00:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('IS_app', '0002_usertokenjwt'),
    ]

    operations = [
        migrations.AddField(
            model_name='subscription',
            name='subscription_end_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
