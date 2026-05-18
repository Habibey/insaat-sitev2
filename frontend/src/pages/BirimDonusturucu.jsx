import { useState, useEffect } from 'react';
import axios from 'axios';

export default function BirimDonusturucu() {
  const [categories, setCategories] = useState({});
  const [activeCat, setActiveCat] = useState('length');
  const [inputs, setInputs] = useState({ value: 1.0, from_unit: 'm', to_unit: 'cm' });
  const [result, setResult] = useState(null);

  // Sayfa yüklendiğinde kategorileri Backend'den çek
  useEffect(() => {
    axios.get(`/api/unit-converter/`)
      .then(res => {
        setCategories(res.data.categories);
        // İlk kategori yüklendiğinde varsayılan birimleri ayarla
        if (res.data.categories['length']) {
          setInputs({ value: 1.0, from_unit: res.data.categories['length'].units[0], to_unit: res.data.categories['length'].units[1] });
        }
      });
  }, []);

  // Değerler her değiştiğinde otomatik hesapla
  useEffect(() => {
    if (inputs.from_unit && inputs.to_unit) {
      axios.post(`/api/unit-converter/`, { category: activeCat, ...inputs })
        .then(res => setResult(res.data));
    }
  }, [inputs, activeCat]);

  const handleCatChange = (catKey) => {
    setActiveCat(catKey);
    const units = categories[catKey].units;
    setInputs({ value: 1.0, from_unit: units[0], to_unit: units[1] || units[0] });
  };

  const swapUnits = () => {
    setInputs({ ...inputs, from_unit: inputs.to_unit, to_unit: inputs.from_unit });
  };

  const cardStyle = { background: 'var(--bg-card)', 
  padding: '20px', 
  border: '1px solid var(--border-color)', 
  marginBottom: '20px',
  color: 'var(--text-main)' };

  if (Object.keys(categories).length === 0) return <div>Yükleniyor...</div>;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '50px' }}>
      
      {/* Kategori Seçici Butonlar */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {Object.entries(categories).map(([key, cat]) => (
          <button 
            key={key} 
            onClick={() => handleCatChange(key)}
            style={{ padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', background: activeCat === key ? '#2ecc71' : '#ecf0f1', color: activeCat === key ? 'white' : '#2c3e50' }}
          >
            {cat.tr}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', ...cardStyle }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#7f8c8d' }}>Değer</label>
          <input type="number" value={inputs.value} onChange={e => setInputs({...inputs, value: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #bdc3c7' }}/>
        </div>
        
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#7f8c8d' }}>Kaynak Birim</label>
          <select value={inputs.from_unit} onChange={e => setInputs({...inputs, from_unit: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #bdc3c7' }}>
            {categories[activeCat].units.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>

        <button onClick={swapUnits} style={{ marginTop: '20px', padding: '10px', background: '#34495e', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>⇄</button>

        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#7f8c8d' }}>Hedef Birim</label>
          <select value={inputs.to_unit} onChange={e => setInputs({...inputs, to_unit: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #bdc3c7' }}>
            {categories[activeCat].units.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      </div>

      {result && (
        <>
          <div style={{ ...cardStyle, borderLeft: '5px solid #2ecc71', background: '#f9fcfb' }}>
            <p style={{ margin: 0, color: '#7f8c8d', fontSize: '12px', textTransform: 'uppercase' }}>Sonuç</p>
            <h1 style={{ margin: '10px 0', color: '#27ae60' }}>{result.result} <span style={{ fontSize: '20px', color: '#95a5a6' }}>{inputs.to_unit}</span></h1>
            <p style={{ margin: 0, color: '#34495e', fontSize: '14px', fontFamily: 'monospace' }}>
              {inputs.value} {inputs.from_unit} = {result.result} {inputs.to_unit}
            </p>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>Tüm Dönüşümler</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead><tr style={{ borderBottom: '2px solid #ecf0f1' }}><th style={{ padding: '10px' }}>Birim</th><th>Açıklama</th><th style={{ textAlign: 'right' }}>Değer</th></tr></thead>
              <tbody>
                {result.table.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f5f6fa', background: row.unit === inputs.to_unit ? '#e8f8f5' : 'transparent' }}>
                    <td style={{ padding: '10px', fontWeight: 'bold' }}>{row.unit}</td>
                    <td style={{ color: '#7f8c8d' }}>{row.name}</td>
                    <td style={{ textAlign: 'right', fontWeight: 'bold', color: '#2c3e50' }}>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}