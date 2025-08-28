from rest_framework.pagination import CursorPagination

class PostCursorPagination(CursorPagination):
    page_size = 4
    ordering = '-created_at'