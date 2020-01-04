from rest_framework import serializers
from django.contrib.auth.models import User
from .models import GiftList, Gift

class GiftListOwnerSerializer(serializers.ModelSerializer):
	class Meta:
		model = GiftList
		fields = '__all__'

class GiftListContributorSerializer(serializers.ModelSerializer):
	class Meta:
		model = GiftList
		exclude = ['owner_link', 'recipient_link']

class GiftListRecipientSerializer(serializers.ModelSerializer):
	class Meta:
		model = GiftList
		exclude = ['owner_link', 'contributor_link']

class GiftListCreatorSerializer(serializers.ModelSerializer):
	class Meta:
		model = GiftList
		fields = ['uuid', 'title', 'description', 'recipient', 'created_by']

class GiftSerializer(serializers.ModelSerializer):
	class Meta:
		model = Gift
		fields = "__all__"
		read_only_fields = ["completed", "completed_by", "completed_on"]
