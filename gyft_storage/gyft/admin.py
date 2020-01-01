from django.contrib import admin
from .models import GiftList

# Register your models here.

class GiftAdmin(admin.ModelAdmin):
	list_display = ('title', 'description', 'recipient')

admin.site.register(GiftList, GiftAdmin)