import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next'; // 1. Dil kütüphanesini import ettik

export default function EkipDetay() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); // 2. i18n'i kullanıma aldık
  
  const [kisi, setKisi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/ekip/${id}/`)
      .then(res => {
        setKisi(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Kişi bulunamadı:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Yükleniyor...</div>;
  if (!kisi) return <div style={{ textAlign: 'center', padding: '50px' }}>Kişi bulunamadı!</div>;

  
  const uzmanlik = i18n.language === 'tr' ? kisi.uzmanlik_alanlari_tr : kisi.uzmanlik_alanlari_en;
  const biyografi = i18n.language === 'tr' ? kisi.ozgecmis_tr : kisi.ozgecmis_en;

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', background: 'white', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ background: '#ecf0f1', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' }}>
        ← {i18n.language === 'tr' ? 'Geri Dön' : 'Go Back'}
      </button>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        {/* Sol Taraf: Fotoğraf */}
        <div style={{ flex: '1', minWidth: '250px' }}>
          {kisi.fotograf ? (
            <img src={`${import.meta.env.VITE_API_URL}${kisi.fotograf}`} alt={kisi.ad_soyad} style={{ width: '100%', borderRadius: '10px', objectFit: 'cover', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
          ) : (
            <div style={{ width: '100%', height: '300px', background: '#bdc3c7', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Fotoğraf Yok</div>
          )}
        </div>

        {/* Sağ Taraf: Bilgiler */}
        <div style={{ flex: '2', minWidth: '300px' }}>
          <h1 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{kisi.ad_soyad}</h1>
          <h3 style={{ margin: '0 0 20px 0', color: '#3498db' }}>{kisi.unvan}</h3>
          
          <div style={{ marginBottom: '20px', lineHeight: '1.6', color: '#7f8c8d', background: '#f8f9fa', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #3498db' }}>
            <strong style={{ color: '#2c3e50' }}>Email:</strong> {kisi.email || "-"} <br/>
            <strong style={{ color: '#2c3e50' }}>
              {i18n.language === 'tr' ? 'Uzmanlık Alanları:' : 'Areas of Expertise:'}
            </strong> {uzmanlik || "-"}
          </div>

          <div>
            <h4 style={{ borderBottom: '2px solid #ecf0f1', paddingBottom: '10px', color: '#2c3e50' }}>
              {i18n.language === 'tr' ? 'Hakkında / Biyografi' : 'About / Biography'}
            </h4>
            <p style={{ lineHeight: '1.8', color: '#34495e', whiteSpace: 'pre-wrap' }}>
              {biyografi || (i18n.language === 'tr' ? "Bu kişi için henüz biyografi eklenmemiş." : "Biography not added yet.")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}