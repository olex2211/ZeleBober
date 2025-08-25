from django.urls import path
from . import views

urlpatterns = [
    path('', views.PostListAPIView.as_view(), name='post-list'),
    path('<int:pk>/', views.PostRetrieveAPIView.as_view(), name='post-by-id'),
    path('<int:pk>/comments/', views.CommentListAPIView.as_view(), name='post-comments'),
    path('create/', views.PostCreateAPIView.as_view(), name='post-create'),
    path('<int:pk>/comments/create/', views.CommentCreateAPIView.as_view(), name='comment-create'),
    path('<int:pk>/like', views.ToggleLikeAPIView.as_view(), name='toggle-like-post'),
]
    # path('update/', views.post_update_view, name='post-update'),
    # path('delete/', views.post_destroy_view, name='post-destroy'),


# 127.0.0.1:8000/api/posts/
# 127.0.0.1:8000/api/posts/156/
# 127.0.0.1:8000/api/posts/create/
# 127.0.0.1:8000/api/posts/update/
# 127.0.0.1:8000/api/posts/create/comment/