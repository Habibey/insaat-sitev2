import os
from pathlib import Path


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# 1. GÜVENLİK AYARLARI (Docker üzerinden .env ile çekilecek)
# Eğer ortamda SECRET_KEY yoksa varsayılan olarak seninkini kullanır (Sadece local geliştirme için)
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'django-insecure-f7kdg!#w%w$5()_(*0dp+*y_fzu=c+a3@+-(0vzizb9dds23e)')

# Sunucuda (Docker'da) bunu 'False' yapacağız. Localde 'True' kalacak.
#DEBUG = os.environ.get('DJANGO_DEBUG', 'True') == 'True'
DEBUG = True

# Dışarıdan gelecek isteklere izin verilecek IP/Domainler. Virgüle göre ayırıp listeye çeviriyoruz.
ALLOWED_HOSTS = ['*']  # Geliştirme aşamasında tüm hostlara izin veriyoruz. Üretimde bunu sınırlandırmalısın! 

# 2. VERİTABANI AYARLARI (Dinamik hale getirildi)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME', 'insaat-db'),
        'USER': os.environ.get('DB_USER', 'postgres'),
        'PASSWORD': os.environ.get('DB_PASSWORD', 'postgres123'), 
        'HOST': os.environ.get('DB_HOST', 'db'), # Docker compose servis adı
        'PORT': os.environ.get('DB_PORT', '5432'),
    }
}

# Application definition
INSTALLED_APPS = [
    'rest_framework', # api için gerekli
    'corsheaders', # cross-origin resource sharing için gerekli
    'api', # oluşturduğumuz uygulama
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'tr-tr'
TIME_ZONE = 'Europe/Istanbul'
USE_I18N = True
USE_TZ = True

# Static & Media Files
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [BASE_DIR / "static"]

MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / "media"

# CORS AYARLARI
# Test için True kalabilir ama ileride sadece React'in çalıştığı domaini (örn: hocanin-sitesi.com)
# CORS_ALLOWED_ORIGINS listesine eklemek daha güvenli bir pratiktir.
CORS_ALLOW_ALL_ORIGINS = True

# Test aşamasında Cloudflare tünellerine izin veriyoruz
CSRF_TRUSTED_ORIGINS = [
    'https://*.trycloudflare.com',
    'http://10.80.28.38',
    'http://localhost',
    'http://127.0.0.1'
]