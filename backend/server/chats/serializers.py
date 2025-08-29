from rest_framework import serializers
from .models import Chat, ChatMessage

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'text', 'chat', 'author', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
        extra_kwargs = {
            'text': {'required': True},
            'chat': {'required': True},
            'author': {'required': True},
        }

class ChatSerializer(serializers.ModelSerializer):
    last_message = serializers.SerializerMethodField()
    
    class Meta:
        model = Chat
        fields = ['id', 'title', 'members', 'created_at', 'updated_at', 'last_message']
        read_only_fields = ['created_at', 'updated_at', 'members', 'last_message']
        extra_kwargs = {
            'title': {'required': True},
        }

    def get_last_message(self, obj):
        last = obj.messages.order_by('-created_at').first()
        if last:
            return ChatMessageSerializer(last).data
        return None