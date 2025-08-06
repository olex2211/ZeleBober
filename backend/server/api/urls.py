from django.urls import path, include
from .views import LoginView, RefreshTokenView

urlpatterns = [
    path('posts/', include('posts.urls')),
    path('chats/', include('chats.urls')),
    path('users/', include('users.urls')),
    path('token/', LoginView.as_view(), name='login'),
    path('token/refresh/', RefreshTokenView.as_view(), name='refresh_token'),
]
