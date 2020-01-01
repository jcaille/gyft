from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class GiftList(models.Model):
    title = models.CharField(max_length = 120)
    description = models.TextField()
    recipient = models.ForeignKey(User, on_delete = models.CASCADE)

    def __str__(self):
        return f"<GiftList: {self.title}>"