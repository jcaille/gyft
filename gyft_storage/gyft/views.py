from django.shortcuts import render
from rest_framework import viewsets
from .serializers import GiftListSerialiser
from .models import GiftList

# Create your views here.

class GiftListView(viewsets.ModelViewSet):
	serializer_class = GiftListSerialiser
	queryset = GiftList.objects.all()