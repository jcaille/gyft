from .models import GiftList, Gift
from .serializers import GiftListSerialiser, GiftSerialiser
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

    @action(detail=True)
    def details(self, request, pk=None):
        gift_list = self.get_object()
        gift_list_serializer = GiftListSerialiser(gift_list)
        gift_list_data = gift_list_serializer.data

        gifts = gift_list.gift_set.all()
        gift_serializer = GiftSerialiser(gifts, many = True)
        gifts_data = gift_serializer.data
        
        return Response({
            "gift_list": gift_list_data,
            "gifts": gifts_data
        })


class GiftView(viewsets.ModelViewSet):
    serializer_class = GiftSerialiser
    queryset = Gift.objects.all()

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
