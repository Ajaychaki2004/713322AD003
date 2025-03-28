from django.urls import path
from .views import *

urlpatterns = [
    path("users/", get_top_users, name="get_top_users"),
    path("posts/", get_posts, name="get_posts"),
]
