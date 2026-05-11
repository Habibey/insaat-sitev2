import { Link } from 'react-router-dom';

export default function Uygulamalar() {
  // Uygulama verilerini bir liste olarak tanımlıyoruz (Ekleme/Çıkarma yapması kolay olsun diye)
  const uygulamaListesi = [
    {
      baslik: "3D Geodezik Modelleme Aracı",
      aciklama: "Karmaşık düğüm ve çubuk sistemlerinin yüksek doğrulukla 3 boyutlu analizi.",
      link: "/uygulama/geodezik", // App.jsx'teki rotan neyse burayı ona göre güncelle
   
    },
    {
      baslik: "Kiriş Analizi",
      aciklama: "Farklı yük tipleri ve konumlarıyla kirişlerin eğilme, kesme kuvveti ve moment analizini yapın.",
      link: "/uygulama/kiris-analizi",
     
    },

    {
      baslik: "Bileşik Kesit Analizi",
      aciklama: "Farklı malzeme özelliklerine sahip bileşik kesitlerin (Steiner teoremi ile) analizini yapın.",
      link: "/uygulama/bilesik-kesit",
      
    },
    {
      baslik: "Birim Çevirici",
      aciklama: "Mühendislik projelerinizde ihtiyaç duyabileceğiniz çeşitli birimler arasında hızlı ve güvenilir dönüşümler yapın.",
      link: "/uygulama/birim-cevirici",
   
    }
  ];

  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Sayfa Başlığı (Anasayfa ile Uyumlu) */}
      <div style={{ marginBottom: '4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
        <div style={{ fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--rust)', marginBottom: '0.5rem' }}>
          Tüm Araçlar
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 300, color: 'var(--text-main)', margin: 0 }}>
          Mühendislik Uygulamaları
        </h1>
      </div>

      {/* Uygulamalar Izgarası (Grid) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        
        {uygulamaListesi.map((uygulama, index) => (
          <Link 
            to={uygulama.link} 
            key={index} 
            className="tool-card" 
            style={{ 
              border: '1px solid var(--border-color)', 
              padding: '2rem', 
              background: 'rgba(200,185,154,0.02)', 
              textDecoration: 'none', 
              display: 'block',
              transition: 'all 0.3s ease'
            }}
          >
           
            
            {/* Başlık */}
            <h3 style={{ 
              fontFamily: "'Cormorant Garamond', serif", 
              fontSize: '1.4rem', 
              color: 'var(--text-main)', 
              marginBottom: '0.8rem' 
            }}>
              {uygulama.baslik}
            </h3>
            
            {/* Açıklama */}
            <p style={{ 
              fontSize: '0.65rem', 
              lineHeight: 1.8, 
              color: 'var(--muted)',
              margin: 0 
            }}>
              {uygulama.aciklama}
            </p>
          </Link>
        ))}

      </div>
    </div>
  );
}