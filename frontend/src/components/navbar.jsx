import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { t, i18n } = useTranslation();

  // Butona basıldığında dili değiştiren fonksiyon
  const changeLanguage = () => {
    const newLang = i18n.language === 'tr' ? 'en' : 'tr';
    i18n.changeLanguage(newLang);
  };

  return (
    <nav style={{ 
      display: 'flex', gap: '20px', padding: '20px', 
      background: '#2c3e50', color: 'white', alignItems: 'center' 
    }}>
      <h2 style={{ margin: 0, marginRight: 'auto' }}>İnşaatLab</h2>
      
      {/* Yazıları t('anahtar_kelime') şeklinde çeviriden çekiyoruz */}
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>{t('anasayfa')}</Link>
      <Link to="/uygulamalar" style={{ color: 'white', textDecoration: 'none' }}>{t('uygulamalar')}</Link>
      <Link to="/ekip" style={{ color: 'white', textDecoration: 'none' }}>{t('ekip')}</Link>
      <Link to="/hakkimizda" style={{ color: 'white', textDecoration: 'none' }}>{t('hakkimizda')}</Link>
      
      <button 
        onClick={changeLanguage} 
        style={{ marginLeft: '20px', padding: '5px 15px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        {t('dil_degistir')}
      </button>
    </nav>
  );
}