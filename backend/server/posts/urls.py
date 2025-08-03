from django.urls import path
from . import views

urlpatterns = [
    path('', views.post_list_view, name='post-list'),
    path('<int:pk>/', views.post_retrieve_view, name='post-detail'),
    path('create/', views.post_create_view, name='post-create'),
    path('update/', views.post_update_view, name='post-update'),
    path('delete/', views.post_destroy_view, name='post-destroy'),
]


# 127.0.0.1:8000/api/posts/
# 127.0.0.1:8000/api/posts/156/
# 127.0.0.1:8000/api/posts/create/
# 127.0.0.1:8000/api/posts/update/