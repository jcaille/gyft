from django.db import models

# Create your models here.

class GiftList(models.Model):
    title = models.CharField(max_length = 120)
    description = models.TextField()

    def __str__(self):
        return f"<GiftList: {self.title}>"