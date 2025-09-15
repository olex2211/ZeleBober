from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

# class UserShortSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email', 'first_name', 'last_name', 'photo', 'last_login', 'date_joined']
#         read_only_fields = fields


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
    )
    
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    is_following = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name', 'photo', 'last_login', 'date_joined', 'followers_count', 'following_count', 'is_following']
        extra_kwargs = {
            'username': {'required': True},
            'email': {'required': True},
            'first_name': {'required': True},
            'last_name': {'required': True},
            'last_login': {'read_only': True},
            'date_joined': {'read_only': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
    
    def get_followers_count(self, obj):
        return obj.followers.count()

    def get_following_count(self, obj):
        return obj.following.count()

    def get_is_following(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.followers.filter(id=request.user.id).exists()
        return False


class UserPostsSerializer(UserSerializer):
    posts = serializers.SerializerMethodField()
    liked_posts = serializers.SerializerMethodField()

    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ['posts', 'liked_posts']
    
    def get_posts(self, obj):
        from posts.serializers import PostSerializer
        posts = obj.posts.all()
        return PostSerializer(posts, many=True, context=self.context).data
    
    def get_liked_posts(self, obj):
        from posts.serializers import PostAuthorSerializer
        posts = obj.liked_posts.all()
        return PostAuthorSerializer(posts, many=True, context=self.context).data