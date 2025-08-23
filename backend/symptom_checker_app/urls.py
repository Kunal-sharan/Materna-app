from django.urls import path
from symptom_checker_app import views

urlpatterns = [
    path('symptoms/', views.symptom_list),
    path('symptoms/<int:id>', views.symptom_detail),
    # path('posts/', views.post_list_create),  # GET, POST
    # path('posts/<int:id>/reply/', views.post_reply),  # POST
    # path('posts/<int:id>/like/', views.post_like),  # POST
    #why was this here?
]