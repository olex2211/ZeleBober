from django.shortcuts import get_object_or_404
from rest_framework import filters
from rest_framework.generics import (
    ListAPIView, RetrieveAPIView,
    CreateAPIView, UpdateAPIView, DestroyAPIView
    )
from django.contrib.auth import get_user_model
from .paginators import UserCursorPagination
from .serializers import UserSerializer, UserPostsSerializer
from rest_framework.permissions import AllowAny


User = get_user_model()


class UserListAPIView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = UserCursorPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['^username', '^first_name', '^last_name']


class UserRetrieveAPIView(RetrieveAPIView):
    serializer_class = UserPostsSerializer

    def get_object(self):
        return get_object_or_404(User, pk=self.kwargs['pk'])
    

class UserCreateAPIView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]















class UserUpdateAPIView(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDestroyAPIView(DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer