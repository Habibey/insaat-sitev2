import { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

export default function KirisUygulama() {
  const [L, setL] = useState(6.0);
  const [loads, setLoads] = useState([]);
  const [loadType, setLoadType] = useState('point');
  const [newLoad, setNewLoad] = useState({ P: 10, a: 3, q: 5, b: 6, q1: 0, q2: 10, q_max: 12, q_min: 0, x_peak_rel: 0.5 });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddLoad = () => {
    // Validasyon Kontrolleri
    if (['udl', 'linear', 'parabolic'].includes(loadType)) {
      if (newLoad.b <= newLoad.a) {
        return alert("Hata: Bitiş noktası (b), başlangıç noktasından (a) büyük olmalıdır!");
      }
      if (newLoad.b > L) {
        return alert(`Hata: Yük kiriş uzunluğunu (${L}m) aşamaz!`);
      }
    }
    if (loadType === 'point' && newLoad.a > L) {
      return alert(`Hata: Yük kiriş uzunluğunu (${L}m) aşamaz!`);
    }

    // Yükü Oluşturma
    const loadToAdd = { type: loadType, id: Date.now() };
    if (loadType === 'point') { loadToAdd.P = newLoad.P; loadToAdd.a = newLoad.a; }
    else if (loadType === 'udl') { loadToAdd.q = newLoad.q; loadToAdd.a = newLoad.a; loadToAdd.b = newLoad.b; }
    else if (loadType === 'linear') { loadToAdd.q1 = newLoad.q1; loadToAdd.q2 = newLoad.q2; loadToAdd.a = newLoad.a; loadToAdd.b = newLoad.b; }
    else if (loadType === 'parabolic') { loadToAdd.q_max = newLoad.q_max; loadToAdd.q_min = newLoad.q_min; loadToAdd.x_peak_rel = newLoad.x_peak_rel; loadToAdd.a = newLoad.a; loadToAdd.b = newLoad.b; }
    
    setLoads([...loads, loadToAdd]);
  };

  const removeLoad = (id) => setLoads(loads.filter(l => l.id !== id));

  const handleCalculate = async () => {
    if (loads.length === 0) return alert("Lütfen en az bir yük ekleyin!");
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/calculate-beam/`, { L, loads });
      setResult(response.data);
    } catch (error) {
      console.error("Hata:", error);
      alert("Hesaplama sırasında hata oluştu!");
    }
    setLoading(false);
  };

  const cardStyle = { 
    background: 'var(--bg-card)', 
    padding: '20px', 
    border: '1px solid var(--border-color)', 
    marginBottom: '20px',
    color: 'var(--text-main)',
    borderRadius: '8px'
  };
  
  const inputStyle = { 
    width: '100%', 
    padding: '8px', 
    marginBottom: '10px', 
    borderRadius: '5px', 
    border: '1px solid #ccc' 
  };

  return (
    <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', paddingBottom: '50px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* SOL PANEL - Girdi Alanı */}
      <div style={{ flex: '1', minWidth: '300px', maxWidth: '400px' }}>
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#2c3e50' }}>1. Kiriş Uzunluğu</h3>
          <label>L [m]:</label>
          <input type="number" step="0.5" value={L} onChange={(e) => setL(parseFloat(e.target.value))} style={inputStyle} />
        </div>

        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#2c3e50' }}>2. Yük Ekle</h3>
          <select value={loadType} onChange={(e) => setLoadType(e.target.value)} style={inputStyle}>
            <option value="point">Tekil Yük (P)</option>
            <option value="udl">Sabit Yayılı Yük (q)</option>
            <option value="linear">Lineer Yük (q1 → q2)</option>
            <option value="parabolic">Parabolik Yük</option>
          </select>

          {loadType === 'point' && (
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{flex: 1}}><label>P [kN]:</label><input type="number" value={newLoad.P} onChange={(e)=>setNewLoad({...newLoad, P: parseFloat(e.target.value)})} style={inputStyle}/></div>
              <div style={{flex: 1}}><label>a [m]:</label><input type="number" value={newLoad.a} onChange={(e)=>setNewLoad({...newLoad, a: parseFloat(e.target.value)})} style={inputStyle}/></div>
            </div>
          )}
          {loadType === 'udl' && (
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{flex: 1}}><label>q [kN/m]:</label><input type="number" value={newLoad.q} onChange={(e)=>setNewLoad({...newLoad, q: parseFloat(e.target.value)})} style={inputStyle}/></div>
              <div style={{flex: 1}}><label>a [m]:</label><input type="number" value={newLoad.a} onChange={(e)=>setNewLoad({...newLoad, a: parseFloat(e.target.value)})} style={inputStyle}/></div>
              <div style={{flex: 1}}><label>b [m]:</label><input type="number" value={newLoad.b} onChange={(e)=>setNewLoad({...newLoad, b: parseFloat(e.target.value)})} style={inputStyle}/></div>
            </div>
          )}
          {loadType === 'linear' && (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <div style={{flex: '1 1 45%'}}><label>q1 [kN/m]:</label><input type="number" value={newLoad.q1} onChange={(e)=>setNewLoad({...newLoad, q1: parseFloat(e.target.value)})} style={inputStyle}/></div>
              <div style={{flex: '1 1 45%'}}><label>q2 [kN/m]:</label><input type="number" value={newLoad.q2} onChange={(e)=>setNewLoad({...newLoad, q2: parseFloat(e.target.value)})} style={inputStyle}/></div>
              <div style={{flex: '1 1 45%'}}><label>a [m]:</label><input type="number" value={newLoad.a} onChange={(e)=>setNewLoad({...newLoad, a: parseFloat(e.target.value)})} style={inputStyle}/></div>
              <div style={{flex: '1 1 45%'}}><label>b [m]:</label><input type="number" value={newLoad.b} onChange={(e)=>setNewLoad({...newLoad, b: parseFloat(e.target.value)})} style={inputStyle}/></div>
            </div>
          )}
          {loadType === 'parabolic' && (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <div style={{flex: '1 1 45%'}}><label>q_max [kN/m]:</label><input type="number" value={newLoad.q_max} onChange={(e)=>setNewLoad({...newLoad, q_max: parseFloat(e.target.value)})} style={inputStyle}/></div>
              <div style={{flex: '1 1 45%'}}><label>q_min [kN/m]:</label><input type="number" value={newLoad.q_min} onChange={(e)=>setNewLoad({...newLoad, q_min: parseFloat(e.target.value)})} style={inputStyle}/></div>
              <div style={{flex: '1 1 100%'}}><label>Tepe (0-1):</label><input type="number" step="0.1" value={newLoad.x_peak_rel} onChange={(e)=>setNewLoad({...newLoad, x_peak_rel: parseFloat(e.target.value)})} style={inputStyle}/></div>
              <div style={{flex: '1 1 45%'}}><label>a [m]:</label><input type="number" value={newLoad.a} onChange={(e)=>setNewLoad({...newLoad, a: parseFloat(e.target.value)})} style={inputStyle}/></div>
              <div style={{flex: '1 1 45%'}}><label>b [m]:</label><input type="number" value={newLoad.b} onChange={(e)=>setNewLoad({...newLoad, b: parseFloat(e.target.value)})} style={inputStyle}/></div>
            </div>
          )}
          
          <button onClick={handleAddLoad} style={{ width: '100%', padding: '10px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
            + Yükü Listeye Ekle
          </button>
        </div>

        {loads.length > 0 && (
          <div style={cardStyle}>
            <h4 style={{ marginTop: 0, color: '#2c3e50' }}>Eklenen Yükler</h4>
            {loads.map((ld, i) => (
              <div key={ld.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8f9f9', padding: '10px', marginBottom: '8px', borderRadius: '5px', borderLeft: '3px solid #e74c3c' }}>
                <span style={{ fontSize: '14px', color: '#34495e' }}>{i+1}. {ld.type.toUpperCase()} (a: {ld.a}m)</span>
                <button onClick={() => removeLoad(ld.id)} style={{ background: 'transparent', border: 'none', color: '#e74c3c', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
              </div>
            ))}
            <button onClick={handleCalculate} disabled={loading} style={{ width: '100%', padding: '12px', background: '#34495e', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', marginTop: '15px' }}>
              {loading ? 'Hesaplanıyor...' : '▶ ANALİZ ET'}
            </button>
          </div>
        )}
      </div>

      {/* SAĞ PANEL - Sonuçlar ve Diyagramlar */}
      <div style={{ flex: '2', minWidth: '400px' }}>
        {result ? (
          <>
            {/* Denge Kontrolü */}
            <div style={{ 
              ...cardStyle, 
              background: Math.abs(result.RA + result.RB - result.total_F) < 0.05 ? '#e8f8f5' : '#fdedec', 
              borderLeft: Math.abs(result.RA + result.RB - result.total_F) < 0.05 ? '4px solid #2ecc71' : '4px solid #e74c3c',
              padding: '15px'
            }}>
              <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#2c3e50' }}>
                {Math.abs(result.RA + result.RB - result.total_F) < 0.05 ? '✓ Sistem Dengede' : '⚠ Denge Hatası'}
              </p>
              <small style={{ color: '#7f8c8d' }}>
                RA + RB = {(result.RA + result.RB).toFixed(3)} kN &nbsp;|&nbsp; Toplam Yük (ΣF) = {result.total_F.toFixed(3)} kN
              </small>
            </div>

            {/* Reaksiyonlar */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
              <div style={{ ...cardStyle, flex: 1, borderLeft: '4px solid #3498db', marginBottom: 0 }}>
                <p style={{ margin: 0, color: '#7f8c8d', fontSize: '13px', textTransform: 'uppercase' }}>RA (Sol Mesnet)</p>
                <h2 style={{ margin: '5px 0 0 0', color: '#2c3e50' }}>{result.RA} <small style={{ fontSize: '14px', color: '#95a5a6' }}>kN</small></h2>
              </div>
              <div style={{ ...cardStyle, flex: 1, borderLeft: '4px solid #e74c3c', marginBottom: 0 }}>
                <p style={{ margin: 0, color: '#7f8c8d', fontSize: '13px', textTransform: 'uppercase' }}>RB (Sağ Mesnet)</p>
                <h2 style={{ margin: '5px 0 0 0', color: '#2c3e50' }}>{result.RB} <small style={{ fontSize: '14px', color: '#95a5a6' }}>kN</small></h2>
              </div>
            </div>

            {/* Maksimum / Minimum Değerler */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <div style={{ ...cardStyle, flex: 1, borderLeft: '4px solid #f1c40f', marginBottom: 0, minWidth: '150px' }}>
                <p style={{ margin: 0, color: '#7f8c8d', fontSize: '13px', textTransform: 'uppercase' }}>Max Kesme (V_max)</p>
                <h2 style={{ margin: '5px 0 0 0', color: '#2c3e50' }}>{result.max_values.V_max.val} <small style={{ fontSize: '14px', color: '#95a5a6' }}>kN</small></h2>
                <small style={{ color: '#95a5a6' }}>x = {result.max_values.V_max.x} m</small>
              </div>
              
              <div style={{ ...cardStyle, flex: 1, borderLeft: '4px solid #e67e22', marginBottom: 0, minWidth: '150px' }}>
                <p style={{ margin: 0, color: '#7f8c8d', fontSize: '13px', textTransform: 'uppercase' }}>Min Kesme (V_min)</p>
                <h2 style={{ margin: '5px 0 0 0', color: '#2c3e50' }}>{result.max_values.V_min.val} <small style={{ fontSize: '14px', color: '#95a5a6' }}>kN</small></h2>
                <small style={{ color: '#95a5a6' }}>x = {result.max_values.V_min.x} m</small>
              </div>

              <div style={{ ...cardStyle, flex: 1, borderLeft: '4px solid #2ecc71', marginBottom: 0, minWidth: '150px' }}>
                <p style={{ margin: 0, color: '#7f8c8d', fontSize: '13px', textTransform: 'uppercase' }}>Max Moment (M_max)</p>
                <h2 style={{ margin: '5px 0 0 0', color: '#2c3e50' }}>{result.max_values.M_max.val} <small style={{ fontSize: '14px', color: '#95a5a6' }}>kN·m</small></h2>
                <small style={{ color: '#95a5a6' }}>x = {result.max_values.M_max.x} m</small>
              </div>
            </div>

            {/* Grafikler */}
            <div style={cardStyle}>
              <Plot
                data={[
                  { x: result.arrays.x, y: result.arrays.V, type: 'scatter', mode: 'lines', fill: 'tozeroy', name: 'Kesme (V)', line: { color: '#3498db' } }
                ]}
                layout={{ title: 'Kesme Kuvveti Diyagramı (SFD)', height: 350, margin: { l: 40, r: 20, t: 40, b: 40 }, xaxis: { title: 'x (m)' }, yaxis: { title: 'V (kN)' } }}
                style={{ width: '100%' }}
                config={{ responsive: true }}
              />
            </div>
            
            <div style={cardStyle}>
              <Plot
                data={[
                  { x: result.arrays.x, y: result.arrays.M, type: 'scatter', mode: 'lines', fill: 'tozeroy', name: 'Moment (M)', line: { color: '#2ecc71' } }
                ]}
                layout={{ title: 'Eğilme Momenti Diyagramı (BMD)', height: 350, margin: { l: 40, r: 20, t: 40, b: 40 }, xaxis: { title: 'x (m)' }, yaxis: { title: 'M (kN·m)' } }}
                style={{ width: '100%' }}
                config={{ responsive: true }}
              />
            </div>
          </>
        ) : (
          <div style={{ ...cardStyle, height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#95a5a6', border: '2px dashed #bdc3c7', background: 'transparent' }}>
            <p style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '24px', display: 'block', marginBottom: '10px' }}>📊</span>
              Grafikleri ve hesaplamaları görmek için sol taraftan<br/>kiriş özelliklerini girip "Analiz Et" butonuna basın.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}