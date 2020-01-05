from .models import GiftList, Gift
from . import serializers
from datetime import datetime
from django.db.models import Q
from django.shortcuts import render, get_object_or_404, Http404
from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.exceptions import APIException
from rest_framework.permissions import BasePermission
from rest_framework.request import Request
from rest_framework.response import Response
import uuid

# Create your views here.

class IsAdminUserOrReadOnly(BasePermission):
    """
    Allows access only to admin users.
    """

    def has_permission(self, request, view):
        return bool(
            request.method in SAFE_METHODS or
            request.user and
            request.user.is_staff
        )

class GiftListRecipientView(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    serializer_class = serializers.GiftListRecipientSerializer
    queryset = GiftList.objects.all()
    lookup_field = "recipient_link"


class GiftListContributorView(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    serializer_class = serializers.GiftListContributorSerializer
    queryset = GiftList.objects.all()
    lookup_field = "contributor_link"

    @action(detail=True, url_path='all-gifts')
    def all_gifts(self, request, owner_link = None, contributor_link = None):
        gift_list = self.get_object()
        gifts = gift_list.gift_set.all()
        gift_serializer = serializers.GiftSerializer(gifts, many = True)
        return Response(gift_serializer.data)


class GiftListOwnerView(mixins.UpdateModelMixin, GiftListContributorView):
    serializer_class = serializers.GiftListOwnerSerializer
    queryset = GiftList.objects.all()
    lookup_field = "owner_link"
    permission_classes = []

    def get_serializer_class(self):
        if self.action == 'update':
            return serializers.GiftListOwnerUpdateSerializer
        return self.serializer_class


class GiftListView(viewsets.ModelViewSet):
    serializer_class = serializers.GiftListRecipientSerializer
    queryset = GiftList.objects.all()

    def get_serializer_class(self):
        if self.request.user.is_staff:
            return serializers.GiftListOwnerSerializer
        if self.action == 'create':
            return serializers.GiftListOwnerSerializer
        return self.serializer_class

class GiftAlreadyCompletedException(APIException):
    status_code = 409
    default_detail = 'The gift has already been completed by someone else'
    default_code = 'gift_already_completed'


class GiftView(mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.DestroyModelMixin,
                   viewsets.GenericViewSet):
    serializer_class = serializers.GiftSerializer
    queryset = Gift.objects.all()

    @action(detail=True, methods=["POST"], serializer_class=serializers.GiftCompleteSerializer)
    def complete(self, request: Request , pk=None):
        gift: Gift = self.get_object()
        completed_gift = serializers.GiftCompleteSerializer(data=request.data)
        
        if gift.completed:
            raise GiftAlreadyCompletedException()
        
        if completed_gift.is_valid(raise_exception=True):
            gift.completed = True
            gift.completed_by = completed_gift.data["completed_by"]
            gift.completed_on = datetime.now()
            gift.save()

        serializer = self.get_serializer(gift)
        return Response(serializer.data)

