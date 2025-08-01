from django.urls import path
from .views import PostRetrieveUpdateDestroyView

app_name = 'posts'

urlpatterns = [
    path('<int:pk>', PostRetrieveUpdateDestroyView.as_view(), name='post-detail'),
]