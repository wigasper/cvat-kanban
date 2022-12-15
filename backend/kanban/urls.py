from django.urls import include, path

from rest_framework.routers import DefaultRouter

from kanban import views

app_name = "kanban"

router = DefaultRouter()
router.register(r"columns", views.KanbanColumnViewSet, basename="columns")
router.register(r"cards", views.KanbanCardViewSet, basename="cards")
router.register(r"boards", views.KanbanBoardViewSet, basename="boards")
router.register(r"users", views.UserViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
