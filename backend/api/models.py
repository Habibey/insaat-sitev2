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
    uzmanlik_alanlari_tr=models.CharField(max_length=200,verbose_name="Uzmanlık Alanları (TR)",null=True, blank=True) # Türkçe uzmanlık alanları
    uzmanlik_alanlari_en=models.CharField(max_length=200,verbose_name="Uzmanlık Alanları (EN)",null=True, blank=True) # Dil desteği için çift alan
    email=models.EmailField(null=True, blank=True)
    sira = models.IntegerField(default=0, help_text="Sitede görünme sırası")

    def __str__(self):
        return f"{self.unvan} {self.ad_soyad}"

class Hakkimizda(models.Model):
    baslik_tr = models.CharField(max_length=200, default="Hakkımızda", verbose_name="Başlık (TR)")
    baslik_en = models.CharField(max_length=200, default="About Us", verbose_name="Title (EN)") # Dil desteği için çift alan
    icerik_tr = models.TextField(verbose_name="İçerik (TR)")
    icerik_en = models.TextField(verbose_name="Content (EN)") # Dil desteği için çift alan
    
    class Meta:
        verbose_name = "Hakkımızda Bilgisi"
        verbose_name_plural = "Hakkımızda Bilgileri"

    def __str__(self):
        return "Hakkımızda Bilgisi: " + self.baslik_tr 


