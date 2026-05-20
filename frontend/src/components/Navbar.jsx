import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; 

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

  return (
    <nav className="navbar">
      {/* SOL TARAF: LOGO */}
      <Link to="/" className="navbar-logo">
        <span className="navbar-title">HISTECH</span>
        <span className="navbar-subtitle">
          {i18n.language === 'tr' ? 'Yapısal Sağlık İzleme' : 'Structural Health Monitoring'}
        </span>
      </Link>

      {/* SAĞ TARAF: LİNKLER VE BUTONLAR */}
      <div className="navbar-menu">
        <a href="/#research" className="navbar-link">{t('nav_arastirma', 'Araştırma')}</a>
        <a href="/#apps" className="navbar-link">{t('nav_uygulamalar', 'Uygulamalar')}</a>
        <a href="/#ekip" className="navbar-link">{t('nav_ekip', 'Ekip')}</a>
        <a href="/#about" className="navbar-link">{t('nav_hakkimizda', 'Hakkımızda')}</a>
        
        {/* Özel İletişim Butonu */}
        <a href="/#contact" className="navbar-link navbar-contact">
          {t('nav_iletisim', 'İletişim')}
        </a>
        
        {/* DİL DEĞİŞTİRME BUTONU */}
        <button onClick={toggleLanguage} className="navbar-btn">
          {i18n.language === 'tr' ? '🇬🇧 EN' : '🇹🇷 TR'}
        </button>

        {/* TEMA BUTONU */}
        <button onClick={toggleTheme} className="navbar-btn theme-btn">
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
}