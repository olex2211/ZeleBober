from rest_framework import serializers
from .models import Post, Comment
from users.serializers import UserSerializer

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'text', 'created_at', 'updated_at', 'post']
        read_only_fields = ['created_at', 'updated_at', 'post']
        extra_kwargs = {
            'text': {'required': True},
        }


class CommentAuthorSerializer(CommentSerializer):
    author = UserSerializer(read_only=True)

    class Meta(CommentSerializer.Meta):
        fields = CommentSerializer.Meta.fields + ['author']


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'description', 'photo', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
        extra_kwargs = {
            'description': {'required': True},
            'photo': {'required': True},
        }


class PostAuthorSerializer(PostSerializer):
    author = UserSerializer(read_only=True)

    class Meta(PostSerializer.Meta):
        fields = PostSerializer.Meta.fields + ['author']