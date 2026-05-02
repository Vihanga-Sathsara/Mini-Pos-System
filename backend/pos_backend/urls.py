from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('api/purchase/', views.purchase, name='purchase'),
    path('api/analytics/', views.analytics, name='analytics'),
    path('api/products/', views.products, name='products'),
    path('api/checkout/', views.checkout, name='checkout')
]