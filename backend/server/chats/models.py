from django.conf import settings
from django.db import models


class Chat(models.Model):
    title = models.CharField(max_length=50, blank=True)
    photo = models.ImageField(upload_to="uploads/chats/", blank=True, null=True)
    members = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='chats')
    private = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    

    class Meta:
        db_table = 'chat'
        ordering = ['-updated_at']

    @classmethod
    def get_or_create_private_chat(cls, user1, user2):
        if user1.id == user2.id:
            raise ValueError("Impossible to create private chat with yourself")
        
        chats = cls.objects.filter(private=True, members=user1)
        for chat in chats:
            if chat.members.filter(id=user2.id).exists():
                return chat
        
        chat = cls.objects.create(private=True)
        chat.members.set([user1, user2])
        return chat


class Message(models.Model):
    author = None
    likes = None
    text = models.CharField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    class Meta:
        abstract = True


class ChatMessage(Message):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='messages')
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='messages')

    
    class Meta:
        db_table = 'chat_message'
        ordering = ['created_at']