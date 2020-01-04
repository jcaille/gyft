from django.db import models
from django.utils.crypto import get_random_string
import uuid

# Create your models here.

class GiftList(models.Model):

    uuid = models.UUIDField(primary_key = True, default=uuid.uuid4, editable=False)
    owner_link = models.SlugField(default = get_random_string, editable = False)
    contributor_link = models.SlugField(default = get_random_string, editable = False)
    recipient_link = models.SlugField(default = get_random_string, editable = False)
    
    title = models.CharField(max_length = 120)
    recipient = models.CharField(max_length = 120)
    description = models.TextField()

    created_on = models.DateTimeField(auto_now_add=True)
    created_by = models.CharField(max_length = 120)

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

    uuid = models.UUIDField(primary_key = True, default=uuid.uuid4, editable=False)

    title = models.CharField(max_length = 120)
    description = models.TextField()
    cost = models.IntegerField()

    gift_list = models.ForeignKey(GiftList, on_delete = models.CASCADE)

    completed = models.BooleanField(default = False)
    completed_on = models.DateTimeField(null = True)
    completed_by = models.CharField(max_length = 120, null = True, blank = True)

    created_on = models.DateTimeField(auto_now_add=True)
    created_by = models.CharField(max_length = 120)

    def __str__(self):
        return f"<Gift: {self.title}>"