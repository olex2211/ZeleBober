from django.urls import path, include
from .views import TokenView, RefreshTokenView, BlacklistTokenView

urlpatterns = [
    path('posts/', include('posts.urls')),
    path('chats/', include('chats.urls')),
    path('users/', include('users.urls')),
    path('token/', TokenView.as_view(), name='token_obtain'),
    path('token/refresh/', RefreshTokenView.as_view(), name='refresh_token'),
    path('token/blacklist/', BlacklistTokenView.as_view(), name='token_blacklist'),
]
