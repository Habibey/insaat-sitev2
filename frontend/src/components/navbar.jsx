import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // EKSİK OLAN IMPORT EKLENDİ

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState('dark');

  // Tema değiştiğinde HTML köküne data-theme ekle
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'tr' ? 'en' : 'tr';
    i18n.changeLanguage(newLang);
  };

  // Linkler için ortak stil sabiti (tekrarı önlemek için)
  const linkStyle = { 
    color: 'var(--muted)', 
    textDecoration: 'none', 
    fontSize: '0.65rem', 
    letterSpacing: '0.2em', 
    textTransform: 'uppercase',
    fontWeight: 'bold'
  };

  return (
    <nav style={{ 
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, 
      padding: '1.2rem 3rem', display: 'flex', alignItems: 'center', 
      justifyContent: 'space-between', background: 'var(--nav-bg)', 
      backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-color)' 
    }}>
      {/* SOL TARAF: LOGO */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.3rem', color: 'var(--stone)', letterSpacing: '0.15em' }}>
          HISTECH-SHM
        </span>
        <span style={{ fontSize: '0.55rem', color: 'var(--muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '2px' }}>
          {i18n.language === 'tr' ? 'Yapısal Sağlık İzleme' : 'Structural Health Monitoring'}
        </span>
      </Link>

      {/* SAĞ TARAF: LİNKLER VE BUTONLAR */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
        
        {/* Yönlendirme Linkleri (Sözlükten Çekiliyor) */}
        {/* t('anahtar', 'Varsayılan Metin') -> Sözlükte bulamazsa ikinciyi yazar */}
        <a href="/#research" style={linkStyle}>{t('nav_arastirma', 'Araştırma')}</a>
        <a href="/#apps" style={linkStyle}>{t('nav_uygulamalar', 'Uygulamalar')}</a>
        <a href="/#ekip" style={linkStyle}>{t('nav_ekip', 'Ekip')}</a>
        <a href="/#about" style={linkStyle}>{t('nav_hakkimizda', 'Hakkımızda')}</a>
        
        {/* Özel İletişim Butonu */}
        <a href="/#contact" style={{ ...linkStyle, background: 'var(--rust)', color: '#F5F0E8', padding: '0.5rem 1.2rem', borderRadius: '2px' }}>
          {t('nav_iletisim', 'İletişim')}
        </a>
        
        {/* DİL DEĞİŞTİRME BUTONU */}
        <button onClick={toggleLanguage} style={{ 
          background: 'transparent', border: '1px solid var(--stone)', color: 'var(--text-main)', 
          padding: '0.4rem 0.8rem', cursor: 'pointer', borderRadius: '4px', fontFamily: 'DM Mono', fontWeight: 'bold' 
        }}>
          {i18n.language === 'tr' ? '🇬🇧 EN' : '🇹🇷 TR'}
        </button>

        {/* TEMA BUTONU */}
        <button onClick={toggleTheme} style={{ 
          background: 'transparent', border: '1px solid var(--stone)', color: 'var(--stone)', 
          padding: '0.4rem 0.8rem', cursor: 'pointer', borderRadius: '4px', fontFamily: 'DM Mono' 
        }}>
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
}