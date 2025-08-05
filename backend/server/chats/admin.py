from django.contrib import admin
from django.contrib.admin import ModelAdmin
from .models import Chat, ChatMessage

@admin.register(Chat)
class ChatAdmin(ModelAdmin):
    model = Chat
    fieldsets = ModelAdmin.fieldsets

@admin.register(ChatMessage)
class ChatMessageAdmin(ModelAdmin):
    model = ChatMessage
    fieldsets = ModelAdmin.fieldsets