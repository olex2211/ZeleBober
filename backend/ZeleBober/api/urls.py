from django.urls import path, include

app_name = 'api'

urlpatterns = [
    path('posts/', include('posts.urls')),
]