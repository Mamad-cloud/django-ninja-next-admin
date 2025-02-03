from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Item(models.Model):
    name = models.CharField(max_length=100)
    desc = models.TextField()
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    def __str__(self):
        return self.name

class Invoice(models.Model):
    name = models.CharField(max_length=100)
    amount = models.FloatField()
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.name

class DasboardSetting(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    background_primary = models.IntegerField()
    foreground_primary = models.IntegerField()

    def __str__(self):
        return f"user: {self.user.get_username()}, pbg: {self.background_primary}, pfg: {self.foreground_primary}"