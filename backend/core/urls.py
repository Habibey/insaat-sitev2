from django.contrib import admin
from django.urls import path
from api.views import calculate_composite, calculate_dome, ekip_listesi, calculate_beam, geometrik_hesapla ,unit_converter ,hakkimizda ,ekip_detay
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
    path('api/geometrik-hesapla/', geometrik_hesapla), # Geometrik özellikler hesaplama API'si
  
    
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)