from rest_framework import serializers
from .models import Post, Comment

class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='author.username', read_only=True)
    user_photo = serializers.ImageField(source='author.photo', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'text', 'answer', 'created_at', 'updated_at', 'author', 'username', 'user_photo', 'post']
        read_only_fields = ['created_at', 'updated_at', 'username', 'user_photo']

class PostSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='author.username', read_only=True)
    user_photo = serializers.ImageField(source='author.photo', read_only=True)
    
    class Meta:
        model = Post
        fields = ['id', 'description', 'photo', 'created_at', 'updated_at', 'author', 'username', 'user_photo']
        read_only_fields = ['created_at', 'updated_at', 'username', 'user_photo']