from rest_framework import serializers
from django.contrib.auth.models import User
from .models import GiftList, Gift

class UserSerialiser(serializers.ModelSerializer):
	
	class Meta:
		model = User
		fields = ('id', 'username', 'first_name', 'last_name', 'email')

class GiftListSerialiser(serializers.ModelSerializer):

	recipient = UserSerialiser(read_only = True)
	created_by = UserSerialiser(read_only = True)

	class Meta:
		model = GiftList
		fields = '__all__'

class CreateGiftListSerialiser(serializers.ModelSerializer):

	class Meta:
		model = GiftList
		fields = ('id', 'title', 'description', 'recipient')

class GiftSerialiser(serializers.ModelSerializer):

	created_by = UserSerialiser(read_only = True)
	completed_by = UserSerialiser(read_only = True)

	class Meta:
		model = Gift
		fields = "__all__"
		read_only_fields = ["completed", "completed_by", "completed_on"]
