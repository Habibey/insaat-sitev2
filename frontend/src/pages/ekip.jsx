import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export default function Ekip() {
  const { t, i18n } = useTranslation();
  const [personeller, setPersoneller] = useState([]);

  // Sayfa yüklendiğinde Django'dan verileri getir
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/ekip/')
      .then(response => {
        setPersoneller(response.data);
      })
      .catch(error => console.error("Veri çekme hatası:", error));
  }, []);

  return (
    <div>
      <h2>{t('ekip_baslik')}</h2>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
        {personeller.map(kisi => (
          <div key={kisi.id} style={{ 
            border: '1px solid #ddd', padding: '20px', borderRadius: '10px', 
            width: '300px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' 
          }}>
            
            {/* Fotoğraf varsa göster */}
            {kisi.fotograf && (
              <img 
                src={`http://127.0.0.1:8000${kisi.fotograf}`} 
                alt={kisi.ad_soyad} 
                style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '8px' }} 
              />
            )}
            
            <h3 style={{ marginBottom: '5px' }}>{kisi.unvan} {kisi.ad_soyad}</h3>
            
            {/* MÜHENDİSLİK DOKUNUŞU: Dil 'tr' ise Türkçe özgeçmişi, 'en' ise İngilizceyi göster */}
            <p style={{ color: '#555', lineHeight: '1.6' }}>
              {i18n.language === 'tr' ? kisi.ozgecmis_tr : kisi.ozgecmis_en}
            </p>
            
          </div>
        ))}
      </div>
    </div>
  );
}