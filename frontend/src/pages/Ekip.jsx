import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Ekip() {
  const { t, i18n } = useTranslation();
  const [personeller, setPersoneller] = useState([]);

  useEffect(() => {
    axios.get(`/api/ekip/`)
      .then(response => {
        console.log("DJANGO'DAN GELEN VERİ:", response.data); 
        setPersoneller(response.data.results || response.data);
      })
      .catch(error => console.error("Veri çekme hatası:", error));
  }, []);

  return (
    <section className="team-section">
      <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {t('ekip_baslik')}
      </h2>
      
      <div className="team-grid">
        {personeller?.map(kisi => (
          <Link 
            to={`/ekip/${kisi.id}`} 
            key={kisi.id} 
            className="team-link"
          >
            <div className="team-card">
              
              {/* Fotoğraf varsa göster */}
              {kisi.fotograf && (
                <img 
                  src={kisi.fotograf} 
                  alt={kisi.ad_soyad} 
                  className="team-img"
                />
              )}
              
              <h3 className="team-name">{kisi.unvan} {kisi.ad_soyad}</h3>
              
              <p className="team-desc">
                {i18n.language === 'tr' 
                  ? kisi.uzmanlik_alanlari_tr?.substring(0, 100) 
                  : kisi.uzmanlik_alanlari_en?.substring(0, 100)}...
              </p>
              
              <div className="team-action">
                {i18n.language === 'tr' ? 'Detaylı Bilgi ➔' : 'View Profile ➔'}
              </div>
              
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}