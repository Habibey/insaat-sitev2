"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
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
from api.views import calculate_composite, calculate_dome, ekip_listesi, calculate_beam ,unit_converter ,hakkimizda ,ekip_detay
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/calculate/', calculate_dome), # API adresimiz bu oldu!
    path('api/ekip/', ekip_listesi),       # Ekip verisi için adres
    path('api/calculate-beam/', calculate_beam), # Kiriş hesaplama API'si
    path('api/calculate-composite/', calculate_composite), # Bileşik kesit hesaplama API'si
    path('api/unit-converter/', unit_converter), # Birim çevirici API'si
    path('api/hakkimizda/',hakkimizda), # Hakkımızda API'si
    path('api/ekip/<int:pk>/', ekip_detay), # Belirli bir akademik personel için detay API'si
  
    
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)