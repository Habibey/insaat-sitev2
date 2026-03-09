from django.contrib import admin
from .models import AkademikPersonel

@admin.register(AkademikPersonel)
class AkademikPersonelAdmin(admin.ModelAdmin):
    # Admin listesinde hangi sütunlar görünsün
    list_display = ('ad_soyad', 'unvan', 'sira')
    # Listeden çıkmadan sırayı değiştirebilmek için
    list_editable = ('sira',) 
    # Varsayılan sıralama şekli
    ordering = ('sira',)


