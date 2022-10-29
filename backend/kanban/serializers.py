from rest_framework import serializers

from kanban import models


class KanbanColumnSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.KanbanColumn
        fields = ["name", "position"]


class KanbanCardSerializer(serializers.ModelSerializer):

    column = serializers.PrimaryKeyRelatedfield(
        many=False, queryset=models.KanbanColumn.objects.all()
    )

    class Meta:
        model = models.KanbanSerializer
        fields = ["name", "column"]
