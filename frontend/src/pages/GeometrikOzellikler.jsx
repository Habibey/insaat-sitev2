import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export default function GeometrikOzellikler() {
  const { t } = useTranslation();
  
  // State (Durum) Yönetimi
  const [shape, setShape] = useState('rectangle');
  const [inputs, setInputs] = useState({ b: 100, h: 200, r: 50 });
  const [result, setResult] = useState(null);

  // Değerler her değiştiğinde otomatik olarak Django'ya (Backend) sor
  useEffect(() => {
    // Şekle göre sadece ilgili parametreleri gönder
    const params = shape === 'rectangle' 
      ? { b: inputs.b, h: inputs.h } 
      : { r: inputs.r };

    axios.post(`${import.meta.env.VITE_API_URL}/geometrik-hesapla/`, { shape, params })
      .then(res => {
        if (res.data.status === 'success') {
          setResult(res.data.data);
        }
      })
      .catch(err => console.error("Hesaplama hatası:", err));
  }, [shape, inputs]);

  // Tasarım Stilleri (Senin temanla uyumlu)
  const cardStyle = { 
    background: 'var(--bg-card)', 
    padding: '20px', 
    border: '1px solid var(--border-color)', 
    marginBottom: '20px',
    color: 'var(--text-main)',
    borderRadius: '8px'
  };

  const btnStyle = (active) => ({
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    background: active ? '#2ecc71' : '#ecf0f1',
    color: active ? 'white' : '#2c3e50',
    fontFamily: 'monospace'
  });

  const inputStyle = {
    width: '100%', 
    padding: '10px', 
    borderRadius: '5px', 
    border: '1px solid #bdc3c7',
    marginTop: '5px'
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '50px', paddingTop: '100px' }}>
      <h2 style={{ marginBottom: '20px', color: 'var(--text-main)' }}>
        {t('geometrik_ozellikler_baslik') || 'Geometrik Özellikler'}
      </h2>

      {/* 1. Şekil Seçici Butonlar */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <button 
          onClick={() => setShape('rectangle')}
          style={btnStyle(shape === 'rectangle')}
        >
          {t('dikdortgen') || 'Dikdörtgen'}
        </button>
        <button 
          onClick={() => setShape('circle')}
          style={btnStyle(shape === 'circle')}
        >
          {t('daire') || 'Daire'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {/* 2. Veri Giriş Kartı (Sol Taraf) */}
        <div style={{ flex: '1', minWidth: '300px', ...cardStyle }}>
          <h3 style={{ marginTop: 0, color: '#7f8c8d' }}>Parametreler</h3>
          
          {shape === 'rectangle' ? (
            <>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ color: '#7f8c8d', fontWeight: 'bold' }}>Genişlik - b (mm)</label>
                <input 
                  type="number" 
                  value={inputs.b} 
                  onChange={e => setInputs({...inputs, b: parseFloat(e.target.value) || 0})} 
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ color: '#7f8c8d', fontWeight: 'bold' }}>Yükseklik - h (mm)</label>
                <input 
                  type="number" 
                  value={inputs.h} 
                  onChange={e => setInputs({...inputs, h: parseFloat(e.target.value) || 0})} 
                  style={inputStyle}
                />
              </div>
            </>
          ) : (
            <div style={{ marginBottom: '15px' }}>
              <label style={{ color: '#7f8c8d', fontWeight: 'bold' }}>Yarıçap - r (mm)</label>
              <input 
                type="number" 
                value={inputs.r} 
                onChange={e => setInputs({...inputs, r: parseFloat(e.target.value) || 0})} 
                style={inputStyle}
              />
            </div>
          )}
        </div>

        {/* 3. Sonuç Kartı (Sağ Taraf) */}
        <div style={{ flex: '1', minWidth: '300px', ...cardStyle, borderLeft: '5px solid #2ecc71' }}>
          <h3 style={{ marginTop: 0, color: '#7f8c8d' }}>Hesaplama Sonuçları</h3>
          {result ? (
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '10px 0' }}>Alan (A)</th>
                  <td style={{ fontWeight: 'bold', color: '#27ae60' }}>{result.A.toFixed(2)} mm²</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '10px 0' }}>Ağırlık Merkezi (xc)</th>
                  <td style={{ fontWeight: 'bold' }}>{result.xc.toFixed(2)} mm</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '10px 0' }}>Ağırlık Merkezi (yc)</th>
                  <td style={{ fontWeight: 'bold' }}>{result.yc.toFixed(2)} mm</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '10px 0' }}>Atalet Momenti (Ix0)</th>
                  <td style={{ fontWeight: 'bold', color: '#2980b9' }}>{result.Ix0.toExponential(2)} mm⁴</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '10px 0' }}>Atalet Momenti (Iy0)</th>
                  <td style={{ fontWeight: 'bold', color: '#2980b9' }}>{result.Iy0.toExponential(2)} mm⁴</td>
                </tr>
                <tr>
                  <th style={{ padding: '10px 0' }}>Polar Atalet (Ip)</th>
                  <td style={{ fontWeight: 'bold', color: '#c0392b' }}>{result.Ip.toExponential(2)} mm⁴</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p style={{ color: '#7f8c8d' }}>Hesaplanıyor...</p>
          )}
        </div>
      </div>
    </div>
  );
}