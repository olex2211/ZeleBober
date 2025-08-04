from rest_framework.generics import (
    ListAPIView, RetrieveAPIView,
    CreateAPIView, UpdateAPIView, DestroyAPIView
    )
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from .models import Post
from .serializers import PostSerializer


class PostListAPIView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]


class PostRetrieveAPIView(RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostCreateAPIView(CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostUpdateAPIView(UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostDestroyAPIView(DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


post_list_view = PostListAPIView.as_view()
post_retrieve_view = PostRetrieveAPIView.as_view()
post_create_view = PostCreateAPIView.as_view()
post_update_view = PostUpdateAPIView.as_view()
post_destroy_view = PostDestroyAPIView.as_view()