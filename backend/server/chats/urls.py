from django.urls import path
from . import views
from . import consumers

urlpatterns = [
    path('', views.ChatListAPIView.as_view(), name='chat-list'),
    path('create/', views.ChatCreateAPIView.as_view(), name='chat-create'),
    path('private/<int:pk>/', views.PrivateChatAPIView.as_view(), name="chat-private"),
    path('<int:pk>/leave/', views.LeaveChatAPIView.as_view(), name="chat-leave"),
    path('<int:pk>/messages/', views.ChatMessageListAPIView.as_view(), name='chatmessage-list'),
]

websocket_urlpatterns = [
    path('<int:pk>/', consumers.ChatConsumer.as_asgi()),
]