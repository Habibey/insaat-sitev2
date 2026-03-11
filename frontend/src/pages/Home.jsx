import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div style={{ animation: 'fadeIn 0.8s ease-in-out' }}>
      
      {/* 1. HERO SECTION (Karşılama Ekranı) */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', // Lacivert-Mavi modern geçiş
        color: 'white',
        padding: '100px 30px',
        textAlign: 'center',
        borderRadius: '15px',
        boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
        marginBottom: '50px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Arka planda hafif transparan bir mühendislik deseni/hissi yaratmak için dekoratif şekiller */}
        <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: '-80px', right: '-20px', width: '300px', height: '300px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '25px', letterSpacing: '-1px', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
            {t('hero_baslik')}
          </h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '850px', margin: '0 auto 40px', lineHeight: '1.7', opacity: 0.9 }}>
            {t('hero_altbaslik')}
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <Link to="/uygulamalar" style={{
              background: '#fff', color: '#1e3c72', padding: '15px 35px', borderRadius: '30px',
              textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              🚀 {t('cta_uygulamalar')}
            </Link>
            <Link to="/ekip" style={{
              background: 'transparent', color: '#fff', padding: '15px 35px', borderRadius: '30px',
              textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem', border: '2px solid rgba(255,255,255,0.5)'
            }}>
              👨‍🔬 {t('cta_ekip')}
            </Link>
          </div>
        </div>
      </div>

      {/* 2. ÖZELLİKLER VE ODAK NOKTALARI (Bilgi Kartları) */}
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        
        {/* Kart 1 */}
        <div style={{ flex: '1', minWidth: '280px', background: '#fff', padding: '40px 30px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', textAlign: 'center', transition: 'transform 0.3s' }}>
          <div style={{ fontSize: '50px', marginBottom: '20px' }}>🌐</div>
          <h3 style={{ color: '#2c3e50', fontSize: '1.4rem', marginBottom: '15px' }}>{t('ozellik_1_baslik')}</h3>
          <p style={{ color: '#7f8c8d', lineHeight: '1.6', fontSize: '1rem' }}>{t('ozellik_1_metin')}</p>
        </div>

        {/* Kart 2 */}
        <div style={{ flex: '1', minWidth: '280px', background: '#fff', padding: '40px 30px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', textAlign: 'center' }}>
          <div style={{ fontSize: '50px', marginBottom: '20px' }}>🎓</div>
          <h3 style={{ color: '#2c3e50', fontSize: '1.4rem', marginBottom: '15px' }}>{t('ozellik_2_baslik')}</h3>
          <p style={{ color: '#7f8c8d', lineHeight: '1.6', fontSize: '1rem' }}>{t('ozellik_2_metin')}</p>
        </div>

        {/* Kart 3 */}
        <div style={{ flex: '1', minWidth: '280px', background: '#fff', padding: '40px 30px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', textAlign: 'center' }}>
          <div style={{ fontSize: '50px', marginBottom: '20px' }}>⚙️</div>
          <h3 style={{ color: '#2c3e50', fontSize: '1.4rem', marginBottom: '15px' }}>{t('ozellik_3_baslik')}</h3>
          <p style={{ color: '#7f8c8d', lineHeight: '1.6', fontSize: '1rem' }}>{t('ozellik_3_metin')}</p>
        </div>

      </div>
    </div>
  );
}