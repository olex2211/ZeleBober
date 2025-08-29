from django.urls import path
from . import views
from . import consumers

urlpatterns = [
    path('', views.ChatListAPIView.as_view(), name='chat-list'),
    path('create/', views.ChatCreateAPIView.as_view(), name='chat-create'),
    path('<int:pk>/messages/', views.ChatMessageListAPIView.as_view(), name='chatmessage-list'),
    # path('<int:pk>/messages/create', views.ChatMessageCreateAPIView.as_view(), name='chatmessage-create'),
]

websocket_urlpatterns = [
    path("<int:pk>/", consumers.ChatConsumer.as_asgi()),
]