from django.shortcuts import get_object_or_404
from rest_framework.generics import (ListAPIView, RetrieveAPIView,
                                     CreateAPIView, UpdateAPIView, DestroyAPIView)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .paginators import PostCursorPagination
from .models import Post, Comment
from .serializers import (PostSerializer, PostAuthorSerializer,
                          CommentSerializer, CommentAuthorSerializer)


class PostListAPIView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostAuthorSerializer
    pagination_class = PostCursorPagination


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


class ToggleLikeAPIView(APIView):
    def post(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return Response({'detail': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

        user = request.user
        if user in post.likes.all():
            post.likes.remove(user)
            is_liked = False
        else:
            post.likes.add(user)
            is_liked = True

        return Response({
            'is_liked': is_liked,
            'likes_count': post.likes.count(),
        }, status=status.HTTP_200_OK)









class PostUpdateAPIView(UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostDestroyAPIView(DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer