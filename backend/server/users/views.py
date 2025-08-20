from django.shortcuts import get_object_or_404
from rest_framework.generics import (
    ListAPIView, RetrieveAPIView,
    CreateAPIView, UpdateAPIView, DestroyAPIView
    )
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, UserPostsSerializer
from rest_framework.permissions import AllowAny

User = get_user_model()

class UserCreateAPIView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    
class UserRetrieveAPIView(RetrieveAPIView):
    serializer_class = UserPostsSerializer

    def get_object(self):
        return get_object_or_404(User, pk=self.kwargs['pk'])
    

class UserListAPIView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    

class UserUpdateAPIView(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDestroyAPIView(DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


user_list_view = UserListAPIView.as_view()
user_retrieve_view = UserRetrieveAPIView.as_view()
user_create_view = UserCreateAPIView.as_view()
user_update_view = UserUpdateAPIView.as_view()
user_destroy_view = UserDestroyAPIView.as_view()