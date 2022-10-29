from typing import Tuple, List, Dict

from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model


class KanbanColumn(models.Model):
    def get_default_position() -> int:
        return max([it.position for it in KanbanColumn.objects.all()]) + 1

    name = models.CharField("List name", max_length=24)
    position = models.PositiveIntegerField(default=get_default_position)

    class Meta:
        ordering = ["position"]

    def __str__(self) -> str:
        return self.name


class KanbanCard(models.Model):
    def get_default_position() -> int:
        return max([it.position for it in KanbanCard.objects.all()]) + 1

    name = models.CharField("Card name", max_length=24)
    column = models.ForeignKey(KanbanColumn, on_delete=models.SET_NULL, null=True)
    position = models.PositiveIntegerField(default=get_default_position)
    user = models.ForeignKey(
        User, related_name="cards", on_delete=models.SET_NULL, null=True
    )

    class Meta:
        ordering = ["position"]

    def __str__(self) -> str:
        return self.name
