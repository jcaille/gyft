from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class GiftList(models.Model):
    title = models.CharField(max_length = 120)
    description = models.TextField()
    recipient = models.ForeignKey(User, on_delete = models.CASCADE)

    created_on = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, 
        on_delete = models.CASCADE, 
        related_name = "gift_list_created_by")

    def __str__(self):
        return f"<GiftList: {self.title}>"

    @property
    def gift_count(self):
        return self.gift_set.count()

    @property
    def total_cost(self):
        all_gifts = self.gift_set.all()
        return sum((g.cost for g in all_gifts))
    

class Gift(models.Model):
    title = models.CharField(max_length = 120)
    description = models.TextField()
    cost = models.IntegerField()

    gift_list = models.ForeignKey(GiftList, on_delete = models.CASCADE)

    completed = models.BooleanField(default = False)
    completed_on = models.DateTimeField(null = True)
    completed_by = models.ForeignKey(User, 
        on_delete = models.CASCADE, 
        null = True, 
        related_name = "completed_by")
    

    created_on = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, 
        on_delete = models.CASCADE, 
        related_name = "created_by")

    def __str__(self):
        return f"<Gift: {self.title}>"