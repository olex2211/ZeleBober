from django.conf import settings
from django.db import models
from chats.models import Message


class Post(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posts')
    description = models.TextField(max_length=2000)
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name='liked_posts')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    photo = models.ImageField(upload_to="uploads/posts/", blank=True, null=True)
    

    class Meta:
        db_table = 'post'
        ordering = ['-created_at']


class Comment(Message):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comments')
    # likes = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name='liked_comments')
    post = models.ForeignKey(Post, on_delete=models.CASCADE,  related_name='comments')

    
    class Meta:
        db_table = 'comment'
        ordering = ['-created_at']