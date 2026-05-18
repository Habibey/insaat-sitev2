import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Ekip() {
  const { t, i18n } = useTranslation();
  // State her zaman boş bir dizi ile başlar
  const [personeller, setPersoneller] = useState([]);

  // Sayfa yüklendiğinde Django'dan verileri getir
  useEffect(() => {
    axios.get(`/api/ekip/`)
      .then(response => {
        // İŞTE BÜYÜK SIRRI BURASI ÇÖZECEK:
        console.log("DJANGO'DAN GELEN VERİ:", response.data); 
        
        setPersoneller(response.data.results || response.data);
      })
      .catch(error => console.error("Veri çekme hatası:", error));
  }, []);

  return (
    <div>
      <h2>{t('ekip_baslik')}</h2>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
        {/* 2. DÜZELTME: Soru işareti (?) ekleyerek verinin dizi olmama ihtimalinde uygulamanın çökmesini engelledik */}
        {personeller?.map(kisi => (
          <Link 
            to={`/ekip/${kisi.id}`} 
            key={kisi.id} 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{ 
              border: '1px solid #ddd', padding: '20px', borderRadius: '10px', 
              width: '300px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              transition: 'transform 0.2s' 
            }}>
              
              {/* Fotoğraf varsa göster */}
              {kisi.fotograf && (
                <img 
                  src={kisi.fotograf} 
                  alt={kisi.ad_soyad} 
                  style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '8px' }} 
                />
              )}
              
              <h3 style={{ marginBottom: '5px' }}>{kisi.unvan} {kisi.ad_soyad}</h3>
              
              <p style={{ color: '#555', lineHeight: '1.6' }}>
                {i18n.language === 'tr' 
                  ? kisi.uzmanlik_alanlari_tr?.substring(0, 100) 
                  : kisi.uzmanlik_alanlari_en?.substring(0, 100)}
              </p>
              
              <div style={{ marginTop: '15px', color: '#3498db', fontSize: '0.9rem', fontWeight: 'bold' }}>
                {i18n.language === 'tr' ? 'Detaylı Bilgi ➔' : 'View Profile ➔'}
              </div>
              
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}