from rest_framework import serializers
from .models import Post, Comment

class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='author.username', read_only=True)
    user_photo = serializers.ImageField(source='author.photo', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'text', 'answer', 'created_at', 'updated_at', 'author', 'username', 'user_photo', 'post']
        read_only_fields = ['created_at', 'updated_at', 'username', 'user_photo', 'author'] #'author'
        extra_kwargs = {
            'text': {'required': True},
            'post': {'required': True},
            # 'author': {'required': True},
        }
        
    def create(self, validated_data):
        # return Comment.objects.create(**validated_data)
        
        # додаємо автора з контексту запиту
        request = self.context.get('request')
        print(request)
        if request and hasattr(request, 'user'):
            validated_data['author'] = request.user
        return super().create(validated_data)
    
class PostSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='author.username', read_only=True)
    user_photo = serializers.ImageField(source='author.photo', read_only=True)
    
    class Meta:
        model = Post
        fields = ['id', 'description', 'photo', 'created_at', 'updated_at', 'author', 'username', 'user_photo']
        read_only_fields = ['created_at', 'updated_at', 'username', 'user_photo']