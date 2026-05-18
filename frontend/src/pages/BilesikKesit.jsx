import { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

export default function BilesikKesit() {
  const [section, setSection] = useState('I');
  // Tüm kesit tiplerinin ihtiyaç duyduğu değişkenleri tek bir state'te tutuyoruz
  const [inputs, setInputs] = useState({ 
    bf: 200, tf: 15, hw: 200, tw: 10,  // I, T, U, Z için
    b: 120, h: 120, t1: 12, t2: 12,    // L için
    B: 200, H: 200, tx: 12, ty: 10     // Box için
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      // Inputları sayısal değere çevirerek gönderiyoruz
      const payload = { section };
      Object.keys(inputs).forEach(key => payload[key] = parseFloat(inputs[key]));

      const response = await axios.post(`/api/calculate-composite/`, payload);
      
      // NOT: Django utils.py içindeki steiner() bir tuple (dizi) dönüyorsa 
      // backend'den gelen veri array olabilir. Eğer obje formatına çevirdiysen bu kısım sorunsuz çalışır.
      setResult(response.data.data);
    } catch (error) {
      alert("Hesaplama sırasında bir hata oluştu! Backend bağlantısını kontrol edin.");
      console.error(error);
    }
    setLoading(false);
  };

  // Frontend'de girilen değerlere göre Plotly şekillerini (dikdörtgenleri) oluşturan fonksiyon
  const generateShapes = () => {
    const { bf, tf, hw, tw, b, h, t1, t2, B, H, tx, ty } = inputs;
    const shapes = [];
    const baseStyle = { type: 'rect', line: { color: '#4a9eff', width: 2 }, fillcolor: 'rgba(74,158,255,0.2)' };
    const pB = parseFloat;

    if (section === 'I') {
      shapes.push({ ...baseStyle, x0: 0, y0: 0, x1: pB(bf), y1: pB(tf) }); // Alt Başlık
      shapes.push({ ...baseStyle, x0: (pB(bf)-pB(tw))/2, y0: pB(tf), x1: (pB(bf)+pB(tw))/2, y1: pB(tf)+pB(hw), fillcolor: 'rgba(74,158,255,0.3)' }); // Gövde
      shapes.push({ ...baseStyle, x0: 0, y0: pB(tf)+pB(hw), x1: pB(bf), y1: pB(tf)+pB(hw)+pB(tf) }); // Üst Başlık
    } else if (section === 'T') {
      shapes.push({ ...baseStyle, x0: (pB(bf)-pB(tw))/2, y0: 0, x1: (pB(bf)+pB(tw))/2, y1: pB(hw), fillcolor: 'rgba(74,158,255,0.3)' }); // Gövde
      shapes.push({ ...baseStyle, x0: 0, y0: pB(hw), x1: pB(bf), y1: pB(hw)+pB(tf) }); // Başlık
    } else if (section === 'L') {
      shapes.push({ ...baseStyle, x0: 0, y0: 0, x1: pB(b), y1: pB(t1) }); // Yatay
      shapes.push({ ...baseStyle, x0: 0, y0: pB(t1), x1: pB(t2), y1: pB(h), fillcolor: 'rgba(74,158,255,0.3)' }); // Dikey
    } else if (section === 'U') {
      shapes.push({ ...baseStyle, x0: 0, y0: 0, x1: pB(bf), y1: pB(tf) }); // Taban
      shapes.push({ ...baseStyle, x0: 0, y0: pB(tf), x1: pB(tw), y1: pB(tf)+pB(hw), fillcolor: 'rgba(74,158,255,0.3)' }); // Sol Web
      shapes.push({ ...baseStyle, x0: pB(bf)-pB(tw), y0: pB(tf), x1: pB(bf), y1: pB(tf)+pB(hw), fillcolor: 'rgba(74,158,255,0.3)' }); // Sağ Web
    } else if (section === 'Z') {
      shapes.push({ ...baseStyle, x0: 0, y0: pB(tf)+pB(hw), x1: pB(bf), y1: pB(tf)+pB(hw)+pB(tf) }); // Üst
      shapes.push({ ...baseStyle, x0: 0, y0: pB(tf), x1: pB(tw), y1: pB(tf)+pB(hw), fillcolor: 'rgba(74,158,255,0.3)' }); // Gövde
      shapes.push({ ...baseStyle, x0: pB(tw)-pB(bf), y0: 0, x1: pB(tw), y1: pB(tf) }); // Alt
    } else if (section === 'Box') {
      shapes.push({ ...baseStyle, x0: 0, y0: 0, x1: pB(B), y1: pB(tx) }); // Alt
      shapes.push({ ...baseStyle, x0: 0, y0: pB(H)-pB(tx), x1: pB(B), y1: pB(H) }); // Üst
      shapes.push({ ...baseStyle, x0: 0, y0: pB(tx), x1: pB(ty), y1: pB(H)-pB(tx), fillcolor: 'rgba(74,158,255,0.3)' }); // Sol
      shapes.push({ ...baseStyle, x0: pB(B)-pB(ty), y0: pB(tx), x1: pB(B), y1: pB(H)-pB(tx), fillcolor: 'rgba(74,158,255,0.3)' }); // Sağ
    }
    return shapes;
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
    borderRadius: '5px', 
    border: '1px solid #ccc',
    marginBottom: '10px'
  };

  return (
    <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', paddingBottom: '50px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* SOL PANEL: Parametreler */}
      <div style={{ flex: '1', minWidth: '300px', maxWidth: '400px' }}>
        <div style={cardStyle}>
          <h2 style={{ marginTop: 0, color: '#2c3e50', fontSize: '1.5rem' }}>Kesit Tipi</h2>
          <select value={section} onChange={(e) => setSection(e.target.value)} style={inputStyle}>
            <option value="I">I Kesit</option>
            <option value="T">T Kesit</option>
            <option value="L">L Kesit (Köşebent)</option>
            <option value="U">U Kesit (Kanal)</option>
            <option value="Z">Z Kesit</option>
            <option value="Box">Kutu Kesit</option>
          </select>
          
          <h3 style={{ marginTop: '20px', color: '#2c3e50' }}>Boyutlar (mm)</h3>
          
          {['I', 'T', 'U', 'Z'].includes(section) && (
            <>
              <div><label>Başlık Genişliği (bf):</label><input type="number" value={inputs.bf} onChange={e=>setInputs({...inputs, bf: e.target.value})} style={inputStyle}/></div>
              <div><label>Başlık Kalınlığı (tf):</label><input type="number" value={inputs.tf} onChange={e=>setInputs({...inputs, tf: e.target.value})} style={inputStyle}/></div>
              <div><label>Gövde Yüksekliği (hw):</label><input type="number" value={inputs.hw} onChange={e=>setInputs({...inputs, hw: e.target.value})} style={inputStyle}/></div>
              <div><label>Gövde Kalınlığı (tw):</label><input type="number" value={inputs.tw} onChange={e=>setInputs({...inputs, tw: e.target.value})} style={inputStyle}/></div>
            </>
          )}
          
          {section === 'L' && (
            <>
              <div><label>Yatay Kanat (b):</label><input type="number" value={inputs.b} onChange={e=>setInputs({...inputs, b: e.target.value})} style={inputStyle}/></div>
              <div><label>Dikey Kanat (h):</label><input type="number" value={inputs.h} onChange={e=>setInputs({...inputs, h: e.target.value})} style={inputStyle}/></div>
              <div><label>Yatay Kalınlık (t1):</label><input type="number" value={inputs.t1} onChange={e=>setInputs({...inputs, t1: e.target.value})} style={inputStyle}/></div>
              <div><label>Dikey Kalınlık (t2):</label><input type="number" value={inputs.t2} onChange={e=>setInputs({...inputs, t2: e.target.value})} style={inputStyle}/></div>
            </>
          )}

          {section === 'Box' && (
            <>
              <div><label>Dış Genişlik (B):</label><input type="number" value={inputs.B} onChange={e=>setInputs({...inputs, B: e.target.value})} style={inputStyle}/></div>
              <div><label>Dış Yükseklik (H):</label><input type="number" value={inputs.H} onChange={e=>setInputs({...inputs, H: e.target.value})} style={inputStyle}/></div>
              <div><label>Yatay Plaka Kalınlığı (tx):</label><input type="number" value={inputs.tx} onChange={e=>setInputs({...inputs, tx: e.target.value})} style={inputStyle}/></div>
              <div><label>Dikey Plaka Kalınlığı (ty):</label><input type="number" value={inputs.ty} onChange={e=>setInputs({...inputs, ty: e.target.value})} style={inputStyle}/></div>
            </>
          )}

          <button onClick={handleCalculate} disabled={loading} style={{ width: '100%', padding: '12px', background: '#34495e', color: 'white', marginTop: '15px', cursor: 'pointer', borderRadius: '5px', fontWeight: 'bold', border: 'none' }}>
            {loading ? 'Hesaplanıyor...' : '▶ Hesapla ve Çiz'}
          </button>
        </div>
      </div>

      {/* SAĞ PANEL: Çizim ve Tablo */}
      <div style={{ flex: '2', minWidth: '400px' }}>
        {result ? (
          <>
            {/* Sonuç Kartları */}
            {/* Sonuç Kartları */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', marginBottom: '15px' }}>
              <div style={{...cardStyle, borderLeft: '4px solid #f1c40f', marginBottom: 0}}>
                <p style={{ margin: 0, color: '#7f8c8d', fontSize: '13px', fontWeight: 'bold' }}>TOPLAM ALAN (A)</p>
                <h3 style={{ margin: '5px 0 0 0' }}>{result.A_tot?.toFixed(1) ?? result[0]?.toFixed(1)} <small style={{ fontSize: '14px', color: '#95a5a6' }}>mm²</small></h3>
              </div>
              
              <div style={{...cardStyle, borderLeft: '4px solid #e74c3c', marginBottom: 0}}>
                <p style={{ margin: 0, color: '#7f8c8d', fontSize: '13px', fontWeight: 'bold' }}>AĞ. MERKEZİ (x̄, ȳ)</p>
                <h3 style={{ margin: '5px 0 0 0' }}>
                  x: {result.xc?.toFixed(1) ?? result[1]?.toFixed(1)}<br/>
                  y: {result.yc?.toFixed(1) ?? result[2]?.toFixed(1)} <small style={{ fontSize: '14px', color: '#95a5a6' }}>mm</small>
                </h3>
              </div>
              
              <div style={{...cardStyle, borderLeft: '4px solid #3498db', marginBottom: 0}}>
                <p style={{ margin: 0, color: '#7f8c8d', fontSize: '13px', fontWeight: 'bold' }}>ATALET MOMENTİ (Ix, Iy)</p>
                <h3 style={{ margin: '5px 0 0 0' }}>
                  Ix: {result.Ix_tot?.toExponential(2) ?? result[3]?.toExponential(2)}<br/>
                  Iy: {result.Iy_tot?.toExponential(2) ?? result[4]?.toExponential(2)}
                </h3>
              </div>

              {/* YENİ EKLENEN ATALET YARIÇAPI KARTLARI */}
              <div style={{...cardStyle, borderLeft: '4px solid #9b59b6', marginBottom: 0}}>
                <p style={{ margin: 0, color: '#7f8c8d', fontSize: '13px', fontWeight: 'bold' }}>ATALET YARIÇAPI (ix)</p>
                <h3 style={{ margin: '5px 0 0 0' }}>
                  {Math.sqrt((result.Ix_tot ?? result[3]) / (result.A_tot ?? result[0])).toFixed(2)} <small style={{ fontSize: '14px', color: '#95a5a6' }}>mm</small>
                </h3>
              </div>

              <div style={{...cardStyle, borderLeft: '4px solid #9b59b6', marginBottom: 0}}>
                <p style={{ margin: 0, color: '#7f8c8d', fontSize: '13px', fontWeight: 'bold' }}>ATALET YARIÇAPI (iy)</p>
                <h3 style={{ margin: '5px 0 0 0' }}>
                  {Math.sqrt((result.Iy_tot ?? result[4]) / (result.A_tot ?? result[0])).toFixed(2)} <small style={{ fontSize: '14px', color: '#95a5a6' }}>mm</small>
                </h3>
              </div>
            </div>
           
            
            {/* Kesit Çizimi */}
            <div style={cardStyle}>
              <Plot
                data={[
                  { 
                    x: [result.xc ?? result[1]], 
                    y: [result.yc ?? result[2]], 
                    type: 'scatter', 
                    mode: 'markers+text', 
                    text: ['G (Ağırlık Merkezi)'], 
                    textposition: 'top right', 
                    marker: { color: 'red', size: 8, symbol: 'cross' },
                    name: 'Santroid'
                  }
                ]}
                layout={{ 
                  title: 'Kesit Geometrisi ve Santroid', 
                  shapes: generateShapes(), 
                  xaxis: { title: 'x (mm)', showgrid: true, scaleanchor: 'y', scaleratio: 1, zeroline: true }, 
                  yaxis: { title: 'y (mm)', showgrid: true, zeroline: true }, 
                  height: 450,
                  margin: { l: 50, r: 50, t: 50, b: 50 }
                }}
                style={{ width: '100%' }}
                config={{ responsive: true }}
              />
            </div>
            
            {/* Steiner Tablosu */}
            <div style={{...cardStyle, overflowX: 'auto'}}>
              <h3 style={{ marginTop: 0, color: '#2c3e50' }}>Steiner Teoremi Detayları</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #bdc3c7', color: '#7f8c8d' }}>
                    <th style={{ padding: '8px' }}>Parça</th>
                    <th>Alan (mm²)</th>
                    <th>yc (mm)</th>
                    <th>dy (mm)</th>
                    <th>Ix0 (mm⁴)</th>
                    <th>A·dy²</th>
                    <th>Ix (mm⁴)</th>
                  </tr>
                </thead>
                <tbody>
                  {(result.tablo || result[5]).map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #ecf0f1' }}>
                      <td style={{ padding: '8px', fontWeight: 'bold', color: '#34495e' }}>{row.label}</td>
                      <td>{row.A.toFixed(1)}</td>
                      <td>{row.yc.toFixed(1)}</td>
                      <td>{row.dy.toFixed(1)}</td>
                      <td>{row.Ix0.toExponential(2)}</td>
                      <td style={{ color: '#e74c3c' }}>{row.Ad2.toExponential(2)}</td>
                      <td style={{ color: '#27ae60', fontWeight: 'bold' }}>{row.Ix_p.toExponential(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div style={{...cardStyle, height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#95a5a6', border: '2px dashed #bdc3c7', background: 'transparent'}}>
            <span style={{ fontSize: '30px', marginBottom: '10px' }}>📏</span>
            Sonuçları ve çizimi görmek için sol taraftan parametreleri girip "Hesapla" butonuna basın.
          </div>
        )}
      </div>
    </div>
  );
}