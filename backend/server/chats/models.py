from django.conf import settings
from django.db import models

class Chat(models.Model):
    members = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='chats')
    title = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    

    class Meta:
        db_table = 'chat'
        ordering = ['-updated_at']


class Message(models.Model):
    author = None
    likes = None
    text = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    class Meta:
        abstract = True


class ChatMessage(Message):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='messages')
    # likes = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name='liked_messages')
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='messages')

    
    class Meta:
        db_table = 'chat_message'
        ordering = ['created_at']