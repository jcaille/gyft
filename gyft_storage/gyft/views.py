from .models import GiftList, Gift
from .serializers import GiftListSerialiser, GiftSerialiser
from django.shortcuts import render
from rest_framework import viewsets

# Create your views here.

class GiftListView(viewsets.ModelViewSet):
	serializer_class = GiftListSerialiser
	queryset = GiftList.objects.all()

class GiftView(viewsets.ModelViewSet):
	serializer_class = GiftSerialiser
	queryset = Gift.objects.all()