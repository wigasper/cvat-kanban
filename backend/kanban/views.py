from django.shortcuts import render

from kanban import serializers, models

from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions

from rest_framework import viewsets

from django.contrib.auth.models import User


class KanbanBoardViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.KanbanBoard.objects.all()
    serializer_class = serializers.KanbanBoardSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class KanbanColumnViewSet(viewsets.ModelViewSet):
    queryset = models.KanbanColumn.objects.all()
    serializer_class = serializers.KanbanColumnSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class KanbanCardViewSet(viewsets.ModelViewSet):
    queryset = models.KanbanCard.objects.all()
    serializer_class = serializers.KanbanCardSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = [permissions.IsAdminUser]


class ThumbnailImageViewSet(viewsets.ModelViewSet):
    queryset = models.ThumbnailImage.objects.all()
    serializer_class = serializers.ThumbnailImageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
