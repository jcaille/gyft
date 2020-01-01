from rest_framework import serializers
from .models import GiftList

class GiftListSerialiser(serializers.ModelSerializer):
	class Meta:
		model = GiftList
		fields = ('id', 'title', 'description', 'recipient')