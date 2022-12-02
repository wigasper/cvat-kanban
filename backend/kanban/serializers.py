from rest_framework import serializers
from django.contrib.auth.models import User

from kanban import models


class ThumbnailImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True)

    class Meta:
        model = models.ThumbnailImage

        fields = ["image"]


class KanbanCardSerializer(serializers.ModelSerializer):
    column = serializers.PrimaryKeyRelatedField(
        many=False, queryset=models.KanbanColumn.objects.all()
    )

    user = serializers.PrimaryKeyRelatedField(many=False, queryset=User.objects.all())

    image = ImageSerializer()

    class Meta:
        model = models.KanbanCard
        fields = [
            "id",
            "name",
            "image",
            "difficulty",
            "num_structures",
            "column",
            "position",
            "user",
        ]


class KanbanColumnSerializer(serializers.ModelSerializer):
    cards = KanbanCardSerializer(read_only=True, many=True)

    # board = serializers.PrimaryKeyRelatedField(
    #    many=False, queryset=models.KanbanBoard.objects.all()
    # )

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
