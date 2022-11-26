from typing import Tuple, List, Dict

from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model


class KanbanBoard(models.Model):
    name = models.CharField("List name", max_length=120)

    def __str__(self) -> str:
        return self.name


class KanbanColumn(models.Model):
    def get_default_position() -> int:
        out = 0

        if KanbanColumn.objects.count() > 0:
            out = max([it.position for it in KanbanColumn.objects.all()]) + 1

        return out

    name = models.CharField("List name", max_length=120)

    position = models.PositiveIntegerField(default=get_default_position)

    board = models.ForeignKey(
        KanbanBoard, related_name="columns", on_delete=models.SET_NULL, null=True
    )

    class Meta:
        ordering = ["position"]

    def __str__(self) -> str:
        return self.name


class KanbanCard(models.Model):
    def get_default_position() -> int:
        out = 0

        if KanbanCard.objects.count() > 0:
            out = max([it.position for it in KanbanCard.objects.all()]) + 1

        return out

    name = models.CharField("Card name", max_length=120)

    column = models.ForeignKey(
        KanbanColumn, related_name="cards", on_delete=models.SET_NULL, null=True
    )

    #position = models.PositiveIntegerField(default=get_default_position)
    position = models.PositiveIntegerField(default=-1, null=True)

    user = models.ForeignKey(
        User, related_name="cards", on_delete=models.SET_NULL, null=True
    )
   
    #@property
#    def get_position(self) -> int:
#        relevant_cards = KanbanCard.objects.filter(column__id=self.column)
#        out = max([it.position for it in relevant_cards.all()]) + 1

#        return out

    class Meta:
        ordering = ["position"]

    def __str__(self) -> str:
        return self.name

    def save(self, *args, **kwargs):
        if self.column and self.position == -1:
            relevant_cards = KanbanCard.objects.filter(column__id=self.column.id)
            
            position = 1

            if relevant_cards.count() > 0:
                position = max([it.position for it in relevant_cards.all()]) + 1

            self.position = position
        super(KanbanCard, self).save(*args, **kwargs)
