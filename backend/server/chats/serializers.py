from rest_framework import serializers
from django.contrib.auth import get_user_model
from users.serializers import UserSerializer
from .models import Chat, ChatMessage

User = get_user_model()

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
    members = UserSerializer(many=True, read_only=True)
    member_ids = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, write_only=True)

    class Meta:
        model = Chat
        fields = ['id', 'title', 'members', 'created_at', 'updated_at', 'last_message', 'private', 'member_ids']
        read_only_fields = ['created_at', 'updated_at', 'last_message']
        extra_kwargs = {
            'title': {'required': True},
        }

    def get_last_message(self, obj):
        last = obj.messages.order_by('-created_at').first()
        if last:
            return ChatMessageSerializer(last).data
        return None

    def create(self, validated_data):
        member_ids = validated_data.pop('member_ids', [])
        chat = Chat.objects.create(**validated_data)
        chat.members.set(member_ids)
        return chat