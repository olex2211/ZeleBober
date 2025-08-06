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
        fields = ['id', 'title', 'members', 'created_at', 'updated_at', 'last_message']
        read_only_fields = ['created_at', 'updated_at', 'members', 'last_message']

    def create(self, validated_data):
        chat = Chat.objects.create(**validated_data)
        chat.members.add(self.context['request'].user)
        return chat