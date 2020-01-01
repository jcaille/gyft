from rest_framework import serializers
from django.contrib.auth.models import User
from .models import GiftList, Gift

class UserSerialiser(serializers.ModelSerializer):
	
	class Meta:
		model = User
		fields = ('id', 'username', 'first_name', 'last_name', 'email')


class GiftListSerialiser(serializers.ModelSerializer):

	recipient = UserSerialiser(read_only = True)

	class Meta:
		model = GiftList
		fields = ('id', 'title', 'description', 'recipient', 'total_cost', 'gift_count')

class GiftSerialiser(serializers.ModelSerializer):

	created_by = UserSerialiser(read_only = True)
	completed_by = UserSerialiser(read_only = True)

	class Meta:
		model = Gift
		fields = "__all__"