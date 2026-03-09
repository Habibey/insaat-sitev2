from rest_framework import serializers
from .models import AkademikPersonel

class AkademikPersonelSerializer(serializers.ModelSerializer):
    class Meta:
        model = AkademikPersonel
        fields = '__all__' # Veritabanındaki tüm sütunları JSON'a çevir

