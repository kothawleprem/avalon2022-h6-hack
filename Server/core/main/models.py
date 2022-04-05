from django.db import models

# Create your models here.

class Player(models.Model):
    name = models.CharField(max_length=250)
    score = models.IntegerField(default=0)

class Room(models.Model):
    name = models.CharField(max_length=250)
    player = models.ManyToManyField(Player)
