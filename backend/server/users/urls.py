from django.urls import path
from . import views

urlpatterns = [
    path('', views.UserListAPIView.as_view(), name='user-list'),
    path('<int:pk>/', views.UserRetrieveAPIView.as_view(), name='user-detail'),
    path('registration/', views.UserCreateAPIView.as_view(), name='user-create'),
]