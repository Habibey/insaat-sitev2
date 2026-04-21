# Temel Python imajını kullan (Django 6.0.2 için 3.12 kullanıyoruz)
FROM python:3.12-slim

# Konteyner içindeki çalışma dizinini ayarla
WORKDIR /app

# Linux için gerekli olan C derleyicilerini ve PostgreSQL kütüphanelerini kur
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Gereksinim dosyasını kopyala
COPY requirements.txt .

# Önce pip'i güncelle, sonra paketleri kur
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Tüm backend kodlarını kopyala
COPY . .

# Django'nun çalışacağı portu aç
EXPOSE 8000

# Projeyi çalıştır
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]