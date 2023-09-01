from django.urls import include, path
from rest_framework import routers
from base.views import (
    ForceRefreshAPIview,
    PostFilterAPIView,
    PostViewSet,
    FeedViewSet,
    DeleteFeedAPIView,
    main_page,
)
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from django.urls import re_path

router = routers.DefaultRouter()
router.register(r"posts", PostViewSet)
router.register(r"feeds", FeedViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("force-refresh-feed", ForceRefreshAPIview.as_view()),
    path("filter-posts", PostFilterAPIView.as_view()),
    path("delete-feeds", DeleteFeedAPIView.as_view()),
    path("schema", SpectacularAPIView.as_view(), name="schema"),
    path(
        "swagger", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"
    ),
    # path("ad", main_page),
    re_path("ad.*", main_page),
]
