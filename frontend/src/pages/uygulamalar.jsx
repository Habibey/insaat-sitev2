import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Uygulamalar() {
  const { t, i18n } = useTranslation();

  const projeler = [
    {
      id: 1,
      baslik_tr: "3D Geodezik Modelleme Aracı",
      baslik_en: "3D Geodesic Modeling Tool",
      baglanti_adresi: "geodezik-modelleme",
      aktif_mi: true
    },
    // İleride yeni bir proje gelirse buraya virgül koyup ekleyebilirsin
  ];

  return (
    <div>
      <h2>{t('uygulamalar')}</h2>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
        {projeler.map(proje => (
          <div key={proje.id} style={{ 
            border: '1px solid #e0e0e0', padding: '25px', borderRadius: '10px', 
            width: '300px', background: 'white', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' 
          }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>
              {i18n.language === 'tr' ? proje.baslik_tr : proje.baslik_en}
            </h3>
            
            <p style={{ color: proje.aktif_mi ? '#27ae60' : '#7f8c8d', fontWeight: 'bold' }}>
              {proje.aktif_mi ? "✅ Kullanıma Açık" : "⏳ Yakında Eklenecek"}
            </p>
            
            {proje.aktif_mi && (
              <Link to={`/uygulama/${proje.baglanti_adresi}`} style={{
                display: 'inline-block', marginTop: '15px', padding: '10px 20px',
                background: '#3498db', color: 'white', textDecoration: 'none', 
                borderRadius: '5px', fontWeight: 'bold'
              }}>
                {i18n.language === 'tr' ? 'Uygulamayı Başlat' : 'Launch App'}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}