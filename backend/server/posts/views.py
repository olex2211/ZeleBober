from django.shortcuts import get_object_or_404
from rest_framework.generics import (ListAPIView, RetrieveAPIView,
    CreateAPIView, UpdateAPIView, DestroyAPIView)
from .models import Post, Comment
from .serializers import (PostSerializer, PostAuthorSerializer,
    CommentSerializer, CommentAuthorSerializer)


class PostListAPIView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostAuthorSerializer


class PostRetrieveAPIView(RetrieveAPIView):
    serializer_class = PostAuthorSerializer

    def get_object(self):
        return get_object_or_404(Post, pk=self.kwargs['pk'])


class PostCreateAPIView(CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class CommentListAPIView(ListAPIView):
    serializer_class = CommentAuthorSerializer

    def get_queryset(self):
        post = get_object_or_404(Post, pk=self.kwargs['pk'])
        return post.comments.all()


class CommentCreateAPIView(CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    
    # def create(self, request, *args, **kwargs):
    #     return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        post = get_object_or_404(Post, pk=self.kwargs['pk'])
        serializer.save(post=post, author=self.request.user)











class PostUpdateAPIView(UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostDestroyAPIView(DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer