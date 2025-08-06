from rest_framework import permissions
from django.shortcuts import get_object_or_404
from .models import Chat

class IsMember(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user in obj.members.all()


class BelongsToChat(permissions.BasePermission):
    def has_permission(self, request, view):
        chat = get_object_or_404(Chat, pk=view.kwargs['pk'])
        return request.user in chat.members.all()