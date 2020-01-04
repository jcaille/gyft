from .models import GiftList, Gift
from . import serializers
from datetime import datetime
from django.db.models import Q
from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, mixins
from rest_framework.decorators import action,
from rest_framework.request import Request
from rest_framework.response import Response
import uuid

# Create your views here.

def is_uuid(pk):
    input_form = 'int' if isinstance(pk, int) else 'hex'
    try:
        value = uuid.UUID(**{input_form: pk})
        return True
    except (AttributeError, ValueError):
        return False

class ContributeGiftListViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    serializer_class = serializers.GiftListContributorSerializer
    queryset = GiftList.objects.all()
    lookup_field = "contribute_link"


class GiftListView(viewsets.ModelViewSet):
    serializer_class = serializers.GiftListRecipientSerializer
    queryset = GiftList.objects.all()

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())

        # Perform the lookup filtering.
        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field
        
        assert lookup_url_kwarg in self.kwargs, (
            'Expected view %s to be called with a URL keyword argument '
            'named "%s". Fix your URL conf, or set the `.lookup_field` '
            'attribute on the view correctly.' %
            (self.__class__.__name__, lookup_url_kwarg)
        )

        filter_kwargs = {self.lookup_field: self.kwargs[lookup_url_kwarg]}
        filter_args = []

        # Fix the PK which might be a slug and not a UUID
        if "pk" in filter_kwargs and not is_uuid(filter_kwargs["pk"]):
            slug = filter_kwargs.pop('pk')
            filter_args = [Q(owner_link = slug) | Q(contributor_link = slug) | Q(recipient_link = slug)]

        obj = get_object_or_404(queryset, *filter_args, **filter_kwargs)

        # May raise a permission denied
        self.check_object_permissions(self.request, obj)

        return obj

    def get_serializer_class(self):
        if self.action == 'create':
            print("THIS IS AN UPDATE !!")
            return serializers.GiftListCreatorSerializer
        if self.request.user.is_staff:
            return serializers.GiftListOwnerSerializer
        return super().get_serializer_class()

    @action(detail=True, url_path="all-gifts")
    def all_gifts(self, request, pk):
        result = self.get_object()
        serializer = self.get_serializer(result)
        return Response(data = serializer.data)

    @action(detail=False,
        url_path="contribute/(?P<contribute_link>[a-zA-Z0-9]{12})")
    def contribute(self, request, contribute_link):
        print(contribute_link)
        result = self.get_object()
        serializers = self.get_serializer(result)
        return Response(data= serializers.data)

class GiftView(viewsets.ModelViewSet):
    serializer_class = serializers.GiftSerializer
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

        serializer = GiftSerializer(gift)
        return Response(serializer.data)

