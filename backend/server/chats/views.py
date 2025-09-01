from rest_framework.generics import (
    ListAPIView, RetrieveAPIView,
    CreateAPIView, UpdateAPIView, DestroyAPIView
    )
# from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Chat, ChatMessage
from .serializers import ChatSerializer, ChatMessageSerializer
# from .permissions import IsMember, BelongsToChat


class ChatListAPIView(ListAPIView):
    serializer_class = ChatSerializer
    
    def get_queryset(self):
        return self.request.user.chats.all()


class ChatCreateAPIView(CreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    
    def perform_create(self, serializer):
        chat = serializer.save()
        chat.members.add(self.request.user)


class ChatMessageListAPIView(ListAPIView):
    serializer_class = ChatMessageSerializer

    def get_queryset(self):
        chat = get_object_or_404(Chat, pk=self.kwargs['pk'])
        return chat.messages.all()