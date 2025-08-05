from django.urls import path
from . import views

urlpatterns = [
    path('', views.user_list_view, name='user-list'),
    path('<int:pk>/', views.user_retrieve_view, name='user-detail'),
    path('registration/', views.user_create_view, name='user-create'),
]
    # path('login/', get),

# user_list_view = UserListAPIView.as_view()
# user_retrieve_view = UserRetrieveAPIView.as_view()
# user_create_view = UserCreateAPIView.as_view()
# user_update_view = UserUpdateAPIView.as_view()
# user_destroy_view = UserDestroyAPIView.as_view()