from typing import Tuple, List, Dict

from django.db import models


class KanbanColumn(models.Model):
    name = models.CharField("List name", max_length=24)
    position = models.PositiveIntegerField()

    class Meta:
        ordering = ["position"]

    def __str__(self) -> str:
        return self.name

    def get_default_position(self) -> int:
        return max([it.position for it in self.objects.all()]) + 1


class KanbanCard(models.Model):
    name = models.CharField("Card name", max_length=24)
    column = models.ForeignKey(KanbanColumn, on_delete=models.SET_NULL, null=True)
