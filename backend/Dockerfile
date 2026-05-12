# Temel Python imajını kullan (Django 6.0.2 için 3.12 kullanıyoruz)
FROM python:3.12-slim

# Python'un pyc dosyaları yazmasını ve logları tamponlamasını engelle (Konteynerlar için iyi pratikler)
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

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

# Gunicorn'u kur (Eğer requirements.txt içinde zaten varsa bu satırı silebilirsin)
RUN pip install gunicorn

# Tüm backend kodlarını kopyala
COPY . .

# Django'nun çalışacağı portu aç
EXPOSE 8000

# Projeyi Gunicorn ile çalıştır (Geliştirme sunucusu yerine)
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "3", "core.wsgi:application"]