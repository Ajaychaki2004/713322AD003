from django.urls import path
from .views import *

urlpatterns = [
    path("users/", get_top_users, name="get_top_users"),
    path("posts/popular/", get_popular_posts, name="get_popular_posts"),
    path("posts/latest/", get_latest_posts, name="get_latest_posts")
]
