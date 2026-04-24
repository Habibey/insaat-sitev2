import { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

export default function BilesikKesit() {
  const [section, setSection] = useState('I');
  const [inputs, setInputs] = useState({ bf: 200, tf: 15, hw: 200, tw: 10, b: 120, h: 120, t1: 12, t2: 12 });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/calculate-composite/`, { section, ...inputs });
      setResult(response.data.data);
    } catch (error) {
      alert("Hesaplama hatası!");
    }
    setLoading(false);
  };

  // Plotly için şekilleri oluştur (Backend'den gelen rect koordinatlarıyla)
  const shapes = result ? result.tablo.map(p => ({
    type: 'rect', x0: p.rect.x0, y0: p.rect.y0, x1: p.rect.x1, y1: p.rect.y1,
    line: { color: '#4a9eff', width: 2 }, fillcolor: 'rgba(74,158,255,0.2)'
  })) : [];

  const cardStyle = { background: 'var(--bg-card)', 
  padding: '20px', 
  border: '1px solid var(--border-color)', 
  marginBottom: '20px',
  color: 'var(--text-main)' };

  return (
    <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', paddingBottom: '50px' }}>
      {/* SOL PANEL: Parametreler */}
      <div style={{ flex: '1', minWidth: '300px' }}>
        <div style={cardStyle}>
          <h2>Kesit Tipi</h2>
          <select value={section} onChange={(e) => setSection(e.target.value)} style={{ width: '100%', padding: '10px' }}>
            <option value="I">I Kesit</option><option value="T">T Kesit</option>
            <option value="L">L Kesit (Köşebent)</option><option value="U">U Kesit (Kanal)</option>
          </select>
          
          <h3 style={{ marginTop: '20px' }}>Boyutlar (mm)</h3>
          {['I', 'T', 'U'].includes(section) && (
            <>
              <div><label>Başlık Genişliği (bf):</label><input type="number" value={inputs.bf} onChange={e=>setInputs({...inputs, bf: e.target.value})} style={{ width: '100%', padding: '8px' }}/></div>
              <div><label>Başlık Kalınlığı (tf):</label><input type="number" value={inputs.tf} onChange={e=>setInputs({...inputs, tf: e.target.value})} style={{ width: '100%', padding: '8px' }}/></div>
              <div><label>Gövde Yüksekliği (hw):</label><input type="number" value={inputs.hw} onChange={e=>setInputs({...inputs, hw: e.target.value})} style={{ width: '100%', padding: '8px' }}/></div>
              <div><label>Gövde Kalınlığı (tw):</label><input type="number" value={inputs.tw} onChange={e=>setInputs({...inputs, tw: e.target.value})} style={{ width: '100%', padding: '8px' }}/></div>
            </>
          )}
          {section === 'L' && (
            <>
              <div><label>Yatay Kanat (b):</label><input type="number" value={inputs.b} onChange={e=>setInputs({...inputs, b: e.target.value})} style={{ width: '100%', padding: '8px' }}/></div>
              <div><label>Dikey Kanat (h):</label><input type="number" value={inputs.h} onChange={e=>setInputs({...inputs, h: e.target.value})} style={{ width: '100%', padding: '8px' }}/></div>
              <div><label>Yatay Kalınlık (t1):</label><input type="number" value={inputs.t1} onChange={e=>setInputs({...inputs, t1: e.target.value})} style={{ width: '100%', padding: '8px' }}/></div>
              <div><label>Dikey Kalınlık (t2):</label><input type="number" value={inputs.t2} onChange={e=>setInputs({...inputs, t2: e.target.value})} style={{ width: '100%', padding: '8px' }}/></div>
            </>
          )}
          <button onClick={handleCalculate} style={{ width: '100%', padding: '12px', background: '#2c3e50', color: 'white', marginTop: '15px', cursor: 'pointer', borderRadius: '5px' }}>
            {loading ? 'Hesaplanıyor...' : '▶ Hesapla ve Çiz'}
          </button>
        </div>
      </div>

      {/* SAĞ PANEL: Çizim ve Tablo */}
      <div style={{ flex: '2', minWidth: '400px' }}>
        {result ? (
          <>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
              <div style={{...cardStyle, flex: 1, borderLeft: '4px solid #f1c40f'}}><b>Alan (A):</b> {result.A_tot.toFixed(1)} mm²</div>
              <div style={{...cardStyle, flex: 1, borderLeft: '4px solid #e74c3c'}}><b>Ağ. Mrk. (y_c):</b> {result.yc.toFixed(2)} mm</div>
              <div style={{...cardStyle, flex: 1, borderLeft: '4px solid #3498db'}}><b>Atalet (Ix):</b> {result.Ix_tot.toExponential(2)} mm⁴</div>
            </div>
            
            <div style={cardStyle}>
              <Plot
                data={[{ x: [result.xc], y: [result.yc], type: 'scatter', mode: 'markers+text', text: ['G (Ağırlık Merkezi)'], textposition: 'top center', marker: { color: 'red', size: 10 } }]}
                layout={{ title: 'Kesit Görünümü', shapes: shapes, xaxis: { showgrid: true, scaleanchor: 'y', scaleratio: 1 }, yaxis: { showgrid: true }, height: 400 }}
                style={{ width: '100%' }}
              />
            </div>
            
            <div style={cardStyle}>
              <h3>Steiner Teoremi Tablosu</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead><tr style={{ borderBottom: '2px solid #ddd' }}><th>Parça</th><th>Alan (mm²)</th><th>yc (mm)</th><th>dy (mm)</th><th>Ix0 (mm⁴)</th><th>A·dy²</th><th>Ix (mm⁴)</th></tr></thead>
                <tbody>
                  {result.tablo.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #eee' }}><td>{row.label}</td><td>{row.A}</td><td>{row.yc}</td><td>{row.dy}</td><td>{row.Ix0}</td><td>{row.Ad2}</td><td><b>{row.Ix_p}</b></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : <div style={{...cardStyle, height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Sonuçları görmek için hesaplayın.</div>}
      </div>
    </div>
  );
}