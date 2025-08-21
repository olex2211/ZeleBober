from django.urls import path
from . import views

urlpatterns = [
    path('', views.PostListAPIView.as_view(), name='post-list'),
    path('<int:pk>/', views.CommentListAPIView.as_view(), name='post-comments'),
    path('post/<int:pk>/', views.PostRetrieveAPIView.as_view(), name='post-by-id'),
    path('create/', views.PostCreateAPIView.as_view(), name='post-create'),
]
    # path('update/', views.post_update_view, name='post-update'),
    # path('delete/', views.post_destroy_view, name='post-destroy'),


# 127.0.0.1:8000/api/posts/
# 127.0.0.1:8000/api/posts/156/
# 127.0.0.1:8000/api/posts/create/
# 127.0.0.1:8000/api/posts/update/