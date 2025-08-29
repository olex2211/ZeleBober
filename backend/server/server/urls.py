from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from ws.urls import websocket_urlpatterns as ws_urlpatterns
from channels.routing import URLRouter

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]

websocket_urlpatterns = [
    path('ws/', URLRouter(ws_urlpatterns)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)