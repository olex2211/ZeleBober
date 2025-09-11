from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Chat
from .serializers import ChatSerializer, ChatMessageSerializer

User = get_user_model()

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


class LeaveChatAPIView(APIView):
    def delete(self, request, pk):
        chat = get_object_or_404(Chat, pk=pk)

        if request.user not in chat.members.all():
            return Response({"detail": "You are not a member of this chat."},
                            status=status.HTTP_400_BAD_REQUEST)

        chat.members.remove(request.user)

        if chat.members.count() == 0:
            chat.delete()
            return Response({"detail": "You left and chat was deleted (no members left)."},
                            status=status.HTTP_200_OK)

        return Response({"detail": "You have left the chat."},
                        status=status.HTTP_200_OK)

class PrivateChatAPIView(APIView):
    def post(self, request, pk):
        other_user = User.objects.get(pk=pk)
        chat = Chat.get_or_create_private_chat(request.user, other_user)
        serializer = ChatSerializer(chat, context={"request": request})
        return Response(serializer.data)