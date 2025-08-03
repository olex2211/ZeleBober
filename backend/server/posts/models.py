from django.conf import settings
from django.db import models
from chats.models import Message


class Post(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posts')
    description = models.TextField(max_length=2000)
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name='liked_posts')
    # photo = models.CharField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    

    class Meta:
        db_table = 'post'


class Comment(Message):
    post = models.ForeignKey(Post, on_delete=models.CASCADE,  related_name='comments')

    
    class Meta:
        db_table = 'comment'