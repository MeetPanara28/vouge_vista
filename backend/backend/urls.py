"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from backapp import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('api/get-csrf-token/',views.get_csrf_token),
    path('api/login/', views.login),
    path('api/signup/', views.signup),
    path('api/get_product/' , views.get_product),
    path('api/up_product/' , views.up_product),
    path('api/admin_login/', views.admin_login),
    path('api/admin_signup/', views.admin_signup),
    path('api/all_product/', views.get_all_products),
    path('api/delete_product/', views.del_data),
    path('api/buy_product/', views.place_order),
    path('api/buyers/', views.get_all_buyers),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)