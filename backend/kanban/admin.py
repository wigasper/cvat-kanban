from django.contrib import admin

from kanban import models


class KanbanCardAdmin(admin.ModelAdmin):
    fields = ["name", "column", "position", "user"]


admin.site.register(models.KanbanCard, KanbanCardAdmin)
# Register your models here.
