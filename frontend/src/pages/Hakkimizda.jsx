import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next'; // Eğer i18n kullanıyorsan

export default function Hakkimizda() {
  const { i18n } = useTranslation(); // Aktif dili almak için (tr veya en)
  const lang = i18n.language || 'tr'; // Eğer i18n kullanmıyorsan burayı sabit 'tr' yapabilirsin
  
  const [icerik, setIcerik] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/hakkimizda/')
      .then(response => {
        setIcerik(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("İçerik çekilirken hata oluştu:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Yükleniyor...</div>;
  }

  if (!icerik) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Henüz içerik eklenmemiş. Lütfen admin panelinden ekleyin.</div>;
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ color: '#2c3e50', borderBottom: '3px solid #3498db', paddingBottom: '10px' }}>
        {lang === 'tr' ? icerik.baslik_tr : icerik.baslik_en}
      </h1>
      
      <div style={{ marginTop: '20px', lineHeight: '1.8', color: '#34495e', fontSize: '1.1rem', whiteSpace: 'pre-wrap' }}>
        {lang === 'tr' ? icerik.icerik_tr : icerik.icerik_en}
      </div>

      <div style={{ display: 'flex', gap: '30px', marginTop: '40px', flexWrap: 'wrap' }}>
        

        
      </div>
    </div>
  );
}