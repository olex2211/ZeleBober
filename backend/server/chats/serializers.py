from rest_framework import serializers
from .models import Chat, ChatMessage

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = '__all__'

class ChatSerializer(serializers.ModelSerializer):
    last_message = serializers.CharField(read_only=True)
    
    class Meta:
        model = Chat
        fields = '__all__'