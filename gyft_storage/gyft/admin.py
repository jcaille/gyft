from django.contrib import admin
from .models import Gift, GiftList

# Register your models here.

class GiftListAdmin(admin.ModelAdmin):
	list_display = ('title', 'description', 'recipient')

class GiftAdmin(admin.ModelAdmin):
	pass


admin.site.register(GiftList, GiftListAdmin)
admin.site.register(Gift, GiftAdmin)