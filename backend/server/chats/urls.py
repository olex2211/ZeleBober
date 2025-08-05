from django.urls import path
from . import views

urlpatterns = [
    path('', views.chat_list_view, name='chat-list'),
    path('<int:pk>/', views.chat_message_list_view, name='chatmessage-list'),
    path('create/', views.chat_create_view, name='chat-create'),
]
    # path('<int:pk>/update/', views.chat_update_view, name='chat-update'),
    # path('<int:pk>/leave/', views.chat_destroy_view, name='chat-destroy'),
    # path('<int:pk>', views.chat_retrieve_view, name='chat-detail'),