from django.db import models

class AkademikPersonel(models.Model):
    UNVAN_SECENEKLERI = [
        ('Prof.', 'Profesör'),
        ('Doç.', 'Doçent'),
        ('Dr.', 'Doktor Öğretim Üyesi'),
        ('Arş. Gör.', 'Araştırma Görevlisi'),
    ]
    
    ad_soyad = models.CharField(max_length=100)
    unvan = models.CharField(max_length=50, choices=UNVAN_SECENEKLERI)
    ozgecmis_tr = models.TextField(help_text="Türkçe Özgeçmiş")
    ozgecmis_en = models.TextField(help_text="İngilizce Özgeçmiş") # Dil desteği için çift alan
    fotograf = models.ImageField(upload_to='ekip/', null=True, blank=True)
    sira = models.IntegerField(default=0, help_text="Sitede görünme sırası")

    def __str__(self):
        return f"{self.unvan} {self.ad_soyad}"


