from django.shortcuts import get_object_or_404
from rest_framework import filters
from rest_framework.generics import (
    ListAPIView, RetrieveAPIView,
    CreateAPIView, UpdateAPIView, DestroyAPIView
    )
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from .paginators import UserCursorPagination
from .serializers import UserSerializer, UserPostsSerializer


User = get_user_model()


class UserListAPIView(ListAPIView):
    serializer_class = UserSerializer
    pagination_class = UserCursorPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['^username', '^first_name', '^last_name']

    def get_queryset(self):
        user = self.request.user
        qs = User.objects.all()
        if user.is_authenticated:
            qs = qs.exclude(id=user.id)
        return qs


class UserRetrieveAPIView(RetrieveAPIView):
    serializer_class = UserPostsSerializer

    def get_object(self):
        return get_object_or_404(User, pk=self.kwargs['pk'])
    

class UserCreateAPIView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class ToggleFollowAPIView(APIView):
    def post(self, request, pk):
        try:
            user_to_follow = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        user = request.user
        if user_to_follow.id == user.id:
            return Response({'detail': 'Can\'t follow yourself'}, status=status.HTTP_400_BAD_REQUEST)
        if user in user_to_follow.followers.all():
            user_to_follow.followers.remove(user)
            is_following = False
        else:
            user_to_follow.followers.add(user)
            is_following = True

        return Response({
            'is_following': is_following,
            'followers_count': user_to_follow.followers.count(),
        }, status=status.HTTP_200_OK)











class UserUpdateAPIView(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDestroyAPIView(DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer