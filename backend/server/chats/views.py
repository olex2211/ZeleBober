from rest_framework.generics import (
    ListAPIView, RetrieveAPIView,
    CreateAPIView, UpdateAPIView, DestroyAPIView
    )
from rest_framework.permissions import IsAuthenticated
from django.db.models import OuterRef, Subquery
from django.shortcuts import get_object_or_404
from .models import Chat, ChatMessage
from .serializers import ChatSerializer, ChatMessageSerializer
from .permissions import IsMember, BelongsToChat


class ChatListAPIView(ListAPIView):
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated, IsMember]

    def get_queryset(self):
        latest_message = ChatMessage.objects.filter(
            chat=OuterRef('pk')
        ).order_by('-created_at')

        return Chat.objects.filter(members=self.request.user).annotate(
            last_message=Subquery(latest_message.values('text')[:1])
        )


class ChatMessageListAPIView(ListAPIView):
    serializer_class = ChatMessageSerializer
    permission_classes = [IsAuthenticated, BelongsToChat]

    def get_queryset(self):
        chat = get_object_or_404(Chat, pk=self.kwargs['pk'])
        return chat.messages.all()


class ChatCreateAPIView(CreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

    # def get_queryset(self):
    #     return Chat.objects.all()











class ChatUpdateAPIView(UpdateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer


class ChatDestroyAPIView(DestroyAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer


chat_list_view = ChatListAPIView.as_view()
chat_message_list_view = ChatMessageListAPIView.as_view()
# chat_retrieve_view = ChatRetrieveAPIView.as_view()
chat_create_view = ChatCreateAPIView.as_view()
chat_update_view = ChatUpdateAPIView.as_view()
chat_destroy_view = ChatDestroyAPIView.as_view()