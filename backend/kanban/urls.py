from django.urls import include

from rest_framework.routers import DefaultRouter

from kanban import views

app_name = "kanban"

router = DefaultRouter()
router.register(r"columns", views.KanbanColumnViewSet, basename="columns")
router.register(r"cards", views.KanbanCardViewSet, basename="cards")

urlpatters = [
    path("", include(router.urls)),
]
