from django.contrib import admin
from django.contrib.admin import ModelAdmin
from .models import Post, Comment

@admin.register(Post)
class PostAdmin(ModelAdmin):
    model = Post
    fieldsets = ModelAdmin.fieldsets

@admin.register(Comment)
class CommentAdmin(ModelAdmin):
    model = Comment
    fieldsets = ModelAdmin.fieldsets