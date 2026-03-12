from rest_framework import serializers
from .models import AkademikPersonel, Hakkimizda

class AkademikPersonelSerializer(serializers.ModelSerializer):
    class Meta:
        model = AkademikPersonel
        fields = '__all__' # Veritabanındaki tüm sütunları JSON'a çevir

class HakkimizdaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hakkimizda
        fields = '__all__' # Veritabanındaki tüm sütunları JSON'a çevir

