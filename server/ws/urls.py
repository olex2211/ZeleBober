from django.urls import path
from channels.routing import URLRouter
from chats.urls import websocket_urlpatterns as chats_urlpatterns

websocket_urlpatterns = [
    path("chats/", URLRouter(chats_urlpatterns)),
]