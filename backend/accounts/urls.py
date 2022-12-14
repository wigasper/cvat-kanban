from django.urls import include, re_path

app_name = "accounts"

urlpatterns = [
    re_path(r"^auth/", include("djoser.urls.base")),
    re_path(r"^auth/", include("djoser.urls.authtoken")),
]
