from rest_framework import serializers
from django.contrib.auth.models import User

from kanban import models

# This serializer exists for use by the KanbanCardSerializer
# It is helpful for the UI to have the username in the 
# response to avoid a second request, BUT I want to avoid
# having all the cards in order to reduce the response size
# and this might be a security issue anyways (in a much greater
# scope project)
class UsernameOnlyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]


class KanbanCardSerializer(serializers.ModelSerializer):
    column = serializers.PrimaryKeyRelatedField(
        many=False, queryset=models.KanbanColumn.objects.all()
    )
    
    # Use the UsernameOnlyUserSerializer to just get the 
    # ID and username for the user
    user = UsernameOnlyUserSerializer(read_only=True)

    class Meta:
        model = models.KanbanCard
        fields = [
            "id",
            "name",
            "thumbnail",
            "difficulty",
            "num_structures",
            "column",
            "position",
            "user",
        ]


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
