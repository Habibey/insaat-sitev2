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
      aciklama_tr: "Karmaşık düğüm ve çubuk sistemlerinin yüksek doğrulukla 3 boyutlu analizi.",
      aciklama_en: "High-accuracy 3D analysis of complex node and member systems.",
      aktif_mi: true
    },
    {
      id: 2,
      baslik_tr: "Kiriş Analizi",
      baslik_en: "Beam Analysis",
      baglanti_adresi: "kiris-analizi",
      aciklama_tr: "Farklı yük tipleri ve konumlarıyla kirişlerin eğilme, kesme kuvveti ve moment analizini yapın.",
      aciklama_en: "Perform bending, shear force, and moment analysis of beams under various load types and positions.",
      aktif_mi: true
    },
    {
      id: 3,
      baslik_tr: "Bileşik Kesit Analizi",
      baslik_en: "Composite Section Analysis",
      baglanti_adresi: "bilesik-kesit",
      aciklama_tr: "Farklı malzeme özelliklerine sahip bileşik kesitlerin analizini yapın.",
      aciklama_en: "Analyze composite sections with different material properties.",
      aktif_mi: true
    },
    {
      id: 4,
      baslik_tr: "Birim Çevirici",
      baslik_en: "Unit Converter",
      baglanti_adresi: "birim-cevirici",
      aciklama_tr: "Mühendislik projelerinizde ihtiyaç duyabileceğiniz çeşitli birimler arasında hızlı ve güvenilir dönüşümler yapın.",
      aciklama_en: "Perform quick and reliable conversions between various units commonly used in engineering projects.",
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
            <p style={{ color: '#7f8c8d', lineHeight: '1.6' }}>
              {i18n.language === 'tr' ? proje.aciklama_tr : proje.aciklama_en}
            </p>
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