from django.urls import path, include

urlpatterns = [
    path('posts/', include('posts.urls')),
    path('chats/', include('chats.urls')),
    path('users/', include('users.urls')),
]