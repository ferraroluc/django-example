from django.db import models

class Pet(models.Model):
    name = models.CharField( max_length=200, blank=False, default='' )
    age = models.IntegerField( blank=False, default='0' )
    exact = models.BooleanField( default=True )