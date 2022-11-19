from rest_framework import serializers
from django.contrib.auth.models import User

from kanban import models


class KanbanCardSerializer(serializers.ModelSerializer):
    column = serializers.PrimaryKeyRelatedField(
        many=False, queryset=models.KanbanColumn.objects.all()
    )

    user = serializers.PrimaryKeyRelatedField(many=False, queryset=User.objects.all())

    class Meta:
        model = models.KanbanCard
        fields = ["id", "name", "column", "position", "user"]


class KanbanColumnSerializer(serializers.ModelSerializer):
    cards = KanbanCardSerializer(read_only=True, many=True)

    class Meta:
        model = models.KanbanColumn
        fields = ["id", "name", "position", "board", "cards"]


class KanbanBoardSerializer(serializers.ModelSerializer):
    columns = KanbanColumnSerializer(read_only=True, many=True)

    class Meta:
        model = models.KanbanBoard
        fields = ["id", "name", "columns"]


class UserSerializer(serializers.ModelSerializer):
    cards = serializers.PrimaryKeyRelatedField(
        many=True, queryset=models.KanbanCard.objects.all()
    )

    class Meta:
        model = User
        fields = ["id", "username", "cards"]
