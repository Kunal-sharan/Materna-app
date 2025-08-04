from django.urls import path
from . import views

urlpatterns = [
    path('', views.PostListCreateView.as_view(), name='post-list-create'),
    path('<int:pk>/reply/', views.ReplyCreateView.as_view(), name='post-reply'),
    path('<int:pk>/like/', views.PostLikeToggleView.as_view(), name='post-like'),
]
