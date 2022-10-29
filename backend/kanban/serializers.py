from rest_framework import serializers
from django.contrib.auth.models import User

from kanban import models


class KanbanColumnSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.KanbanColumn
        fields = ["name", "position"]


class KanbanCardSerializer(serializers.ModelSerializer):

    column = serializers.PrimaryKeyRelatedField(
        many=False, queryset=models.KanbanColumn.objects.all()
    )

    class Meta:
        model = models.KanbanCard
        fields = ["name", "column"]


class UserSerializer(serializers.ModelSerializer):
    cards = serializers.PrimaryKeyRelatedField(
        many=True, queryset=models.KanbanCards.objects.all()
    )

    class Meta:
        model = User
        fields = ["id", "username", "cards"]
