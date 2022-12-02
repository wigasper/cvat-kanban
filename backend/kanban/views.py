from django.shortcuts import render

from kanban import serializers, models

from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions

from rest_framework import viewsets

from django.contrib.auth.models import User


class KanbanBoardViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.KanbanBoard.objects.all()
    serializer_class = serializers.KanbanBoardSerializer
    permission_classes = [permissions.AllowAny]


class KanbanColumnViewSet(viewsets.ModelViewSet):
    queryset = models.KanbanColumn.objects.all()
    serializer_class = serializers.KanbanColumnSerializer
    # FIXME temp for dev
    permission_classes = [permissions.AllowAny]


class KanbanCardViewSet(viewsets.ModelViewSet):
    queryset = models.KanbanCard.objects.all()
    serializer_class = serializers.KanbanCardSerializer
    # FIXME temp for dev
    permission_classes = [permissions.AllowAny]


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer


class ThumbnailImageViewSet(viewsets.ModelViewSet):
    queryset = models.ThumbnailImage.objects.all()
    serializer_class = serializers.ThumbnailImageSerializer
    # FIXME temp for dev
    permission_classes = [permissions.AllowAny]
