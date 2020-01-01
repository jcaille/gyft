from .models import GiftList, Gift
from .serializers import GiftListSerialiser, GiftSerialiser, CreateGiftListSerialiser
from datetime import datetime
from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response

# Create your views here.

class GiftListView(viewsets.ModelViewSet):
    serializer_class = GiftListSerialiser
    queryset = GiftList.objects.all()

    def get_serializer_class(self):
        if self.action == 'create':
            print("THIS IS AN UPDATE !!")
            return CreateGiftListSerialiser
        return super().get_serializer_class()

    def perform_create(self, serializer):
        serializer.save(
            created_by=self.request.user, 
            created_on=datetime.now())


    @action(detail=True, url_path="all-gifts")
    def all_gifts(self, request, pk=None):
        gift_list = self.get_object()
        gifts = gift_list.gift_set.all()
        gift_serializer = GiftSerialiser(gifts, many = True)
        return Response(gift_serializer.data)

class GiftView(viewsets.ModelViewSet):
    serializer_class = GiftSerialiser
    queryset = Gift.objects.all()

    def perform_create(self, serializer):
        serializer.save(
            created_by=self.request.user, 
            created_on=datetime.now())

    @action(detail=True, methods=["POST"])
    def complete(self, request: Request , pk=None):
        gift: Gift = self.get_object()
        if not gift.completed:
            gift.completed = True
            gift.completed_by = request.user
            gift.completed_on = datetime.now()
            gift.save()

        serializer = GiftSerialiser(gift)
        return Response(serializer.data)

