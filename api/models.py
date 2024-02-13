from django.db import models

# Create your models here.


class Note(models.Model):
    body = models.TextField(null = True, blank = True)
    update = models.DateTimeField(auto_now = True)
    created = models.DateTimeField(auto_now_add = True) #only takes the timestap when it is created

    def __str__(self):
        return self.body[0:50]