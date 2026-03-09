import { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import { useTranslation } from 'react-i18next';

export default function GeodezikUygulama() {
  const { t, i18n } = useTranslation();
  
  // Hesaplama ve Veri State'leri
  const [formData, setFormData] = useState({ type: 5, span: 31.78, height: 7, freq: 5 });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- HOCANIN GÖRÜNÜM SEÇENEKLERİ (DISPLAY OPTIONS) STATE'LERİ ---
  const [showNodes, setShowNodes] = useState(true);
  const [showMembers, setShowMembers] = useState(true);
  const [showGroups, setShowGroups] = useState(false);
  const [groupStyle, setGroupStyle] = useState('Colored'); // 'Colored' veya 'Single Color'

  // Parametre değişim fonksiyonu
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
  };

  // Görünüm seçeneklerinde "Grup" ve "Eleman" çakışmasını önleyen mantık
  const handleShowGroups = (e) => {
    setShowGroups(e.target.checked);
    if (e.target.checked) setShowMembers(false);
  };
  const handleShowMembers = (e) => {
    setShowMembers(e.target.checked);
    if (e.target.checked) setShowGroups(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null); 
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/calculate/', formData);
      setResult(response.data);
    } catch (error) {
      console.error("Hesaplama hatası:", error);
      alert("Hata oluştu! Django terminalini kontrol et.");
    }
    setLoading(false);
  };

  // --- ÇİZİM VE KATMAN VERİLERİNİ HAZIRLAMA ---
  let plotTraces = [];
  let layoutConfig = {};
  const palette = ['#636EFA', '#EF553B', '#00CC96', '#AB63FA', '#FFA15A', '#19D3F3', '#FF6692', '#B6E880', '#FF97FF', '#FECB52'];

  if (result && result.nodes_raw && result.members_raw) {
    let xCoords = [], yCoords = [], zCoords = [];

    // Oran koruma (Aspect Ratio) için sınırları bul
    result.nodes_raw.forEach(node => {
      xCoords.push(node[1]); yCoords.push(node[2]); zCoords.push(node[3]);
    });
    const xRange = Math.max(...xCoords) - Math.min(...xCoords) || 1;
    const yRange = Math.max(...yCoords) - Math.min(...yCoords) || 1;
    const zRange = Math.max(...zCoords) - Math.min(...zCoords) || 1;

    layoutConfig = {
      xaxis: { visible: false }, yaxis: { visible: false }, zaxis: { visible: false },
      aspectmode: 'manual', aspectratio: { x: xRange, y: yRange, z: zRange },
      camera: { eye: { x: 1.5, y: 1.5, z: 1.2 } }
    };

    // 1. ELEMAN ÇİZGİLERİ (RENKLİ VEYA TEK RENK) VE GRUP YAZILARI
    if (groupStyle === 'Colored' && result.groups_draw) {
      Object.keys(result.groups_draw).forEach(gid => {
        const color = palette[parseInt(gid) % palette.length];
        const elemIndices = result.groups_draw[gid];
        let lineX = [], lineY = [], lineZ = [];
        let groupMx = [], groupMy = [], groupMz = [], groupText = [];
        
        elemIndices.forEach(ei => {
          let member = result.members_raw[ei];
          let startIdx = parseInt(member[1]) - 1; 
          let endIdx = parseInt(member[2]) - 1;
          let p1 = result.nodes_raw[startIdx];
          let p2 = result.nodes_raw[endIdx];

          if (p1 && p2) {
            lineX.push(p1[1], p2[1], null);
            lineY.push(p1[2], p2[2], null);
            lineZ.push(p1[3], p2[3], null);

            // Grup numaralarını göstermek açıksa tam ortaya metin ekle
            if (showGroups) {
              groupMx.push((p1[1] + p2[1]) / 2);
              groupMy.push((p1[2] + p2[2]) / 2);
              groupMz.push((p1[3] + p2[3]) / 2);
              groupText.push(String(parseInt(gid) + 1));
            }
          }
        });

        // Çizgileri bas
        plotTraces.push({
          x: lineX, y: lineY, z: lineZ,
          type: 'scatter3d', mode: 'lines',
          line: { color: color, width: 3 },
          hoverinfo: 'none', showlegend: false
        });

        // Grup Yazılarını bas
        if (showGroups) {
          plotTraces.push({
            x: groupMx, y: groupMy, z: groupMz,
            type: 'scatter3d', mode: 'text', text: groupText,
            textposition: 'middle center',
            textfont: { size: 10, color: color },
            showlegend: false, hoverinfo: 'none'
          });
        }
      });
    } else {
      // Tek Renk (Single Color) Modu
      let lineX = [], lineY = [], lineZ = [];
      result.members_raw.forEach(member => {
        let p1 = result.nodes_raw[parseInt(member[1]) - 1];
        let p2 = result.nodes_raw[parseInt(member[2]) - 1];
        if(p1 && p2) {
          lineX.push(p1[1], p2[1], null); lineY.push(p1[2], p2[2], null); lineZ.push(p1[3], p2[3], null);
        }
      });
      plotTraces.push({
          x: lineX, y: lineY, z: lineZ,
          type: 'scatter3d', mode: 'lines',
          line: { color: 'lightgray', width: 2 },
          hoverinfo: 'none', showlegend: false
      });
    }

    // 2. DÜĞÜM NOKTALARI VE YAZILARI (NODES)
    if (showNodes) {
      let nodeX = [], nodeY = [], nodeZ = [], nodeText = [];
      result.nodes_raw.forEach(node => {
        nodeX.push(node[1]); nodeY.push(node[2]); nodeZ.push(node[3]);
        nodeText.push(String(node[0])); // Düğüm ID'si
      });
      plotTraces.push({
        x: nodeX, y: nodeY, z: nodeZ,
        type: 'scatter3d', mode: 'markers+text',
        marker: { color: 'black', size: 4 },
        text: nodeText,
        textposition: 'top center',
        textfont: { size: 9, color: 'black' },
        name: i18n.language === 'tr' ? 'Düğümler' : 'Nodes',
        hoverinfo: 'text'
      });
    }

    // 3. ELEMAN NUMARALARI (MEMBERS)
    if (showMembers && !showGroups) {
      let memMx = [], memMy = [], memMz = [], memText = [];
      result.members_raw.forEach(member => {
        let p1 = result.nodes_raw[parseInt(member[1]) - 1];
        let p2 = result.nodes_raw[parseInt(member[2]) - 1];
        if(p1 && p2) {
          memMx.push((p1[1] + p2[1]) / 2);
          memMy.push((p1[2] + p2[2]) / 2);
          memMz.push((p1[3] + p2[3]) / 2);
          memText.push(String(member[0]));
        }
      });
      plotTraces.push({
        x: memMx, y: memMy, z: memMz,
        type: 'scatter3d', mode: 'text', text: memText,
        textposition: 'middle center',
        textfont: { size: 9, color: 'black' },
        showlegend: false, hoverinfo: 'none'
      });
    }
  }

  // Stil Sabitleri
  const tableHeaderStyle = { background: '#f4f7f6', padding: '10px', borderBottom: '2px solid #ddd', textAlign: 'left', fontWeight: 'bold' };
  const tableRowStyle = { borderBottom: '1px solid #eee' };
  const tableCellStyle = { padding: '10px' };
  const containerStyle = { background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.05)' };

  return (
    <div style={{ paddingBottom: '50px' }}>
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', marginBottom: '40px' }}>
        
        {/* SOL TARAF: FORM VE GÖRÜNÜM SEÇENEKLERİ */}
        <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Parametre Formu */}
          <div style={{ ...containerStyle, padding: '25px' }}>
            <h2 style={{ marginTop: 0 }}>{i18n.language === 'tr' ? 'Geodezik Kubbe Parametreleri' : 'Geodesic Dome Parameters'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div><label><b>Type (3-9):</b></label><br/><input type="number" name="type" value={formData.type} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} /></div>
              <div><label><b>Span (m):</b></label><br/><input type="number" step="0.1" name="span" value={formData.span} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} /></div>
              <div><label><b>Height (m):</b></label><br/><input type="number" step="0.1" name="height" value={formData.height} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} /></div>
              <div><label><b>Frequency:</b></label><br/><input type="number" name="freq" value={formData.freq} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} /></div>
              
              <button type="submit" disabled={loading} style={{ 
                padding: '12px', background: loading ? '#bdc3c7' : '#2c3e50', color: 'white', 
                border: 'none', borderRadius: '5px', cursor: loading ? 'not-allowed' : 'pointer', 
                fontSize: '16px', fontWeight: 'bold'
              }}>
                {loading ? 'Hesaplanıyor...' : 'Hesapla & Çiz'}
              </button>
            </form>
          </div>

          {/* GÖRÜNÜM SEÇENEKLERİ (DISPLAY OPTIONS) */}
          <div style={{ ...containerStyle, background: '#f8f9f9', border: '1px solid #e5e8e8' }}>
            <h3 style={{ marginTop: 0, color: '#34495e' }}>{i18n.language === 'tr' ? 'Görünüm Seçenekleri' : 'Display Options'}</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input type="checkbox" checked={showNodes} onChange={(e) => setShowNodes(e.target.checked)} />
                <b>{i18n.language === 'tr' ? 'Düğümleri Göster (Show Nodes)' : 'Show Nodes'}</b>
              </label>
              
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input type="checkbox" checked={showMembers} onChange={handleShowMembers} />
                <b>{i18n.language === 'tr' ? 'Elemanları Göster (Show Members)' : 'Show Members'}</b>
              </label>
              
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input type="checkbox" checked={showGroups} onChange={handleShowGroups} />
                <b>{i18n.language === 'tr' ? 'Grupları Göster (Show Groups)' : 'Show Groups'}</b>
              </label>

              <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '10px 0' }} />
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <b>{i18n.language === 'tr' ? 'Renk Stili (Group Color Style)' : 'Group Color Style'}</b>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input type="radio" name="colorStyle" checked={groupStyle === 'Colored'} onChange={() => setGroupStyle('Colored')} />
                  {i18n.language === 'tr' ? 'Renkli (Colored)' : 'Colored'}
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input type="radio" name="colorStyle" checked={groupStyle === 'Single Color'} onChange={() => setGroupStyle('Single Color')} />
                  {i18n.language === 'tr' ? 'Tek Renk (Single Color)' : 'Single Color'}
                </label>
              </div>
            </div>
          </div>
          
        </div>

        {/* SAĞ TARAF: 3D ÇİZİM ALANI */}
        <div style={{ flex: '2', minWidth: '400px', ...containerStyle, padding: '10px' }}>
          {result ? (
            <Plot
              data={plotTraces}
              layout={{ 
                width: 700, height: 600, 
                title: i18n.language === 'tr' ? `3D Geodezik Model (${result.info_summary.dome_type})` : `3D Geodesic Model (${result.info_summary.dome_type})`,
                margin: { l: 0, r: 0, b: 0, t: 40 },
                showlegend: false, scene: layoutConfig
              }}
            />
          ) : (
            <div style={{ height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7f8c8d', border: '2px dashed #eee', borderRadius: '10px' }}>
              {i18n.language === 'tr' ? 'Grafiği görmek için parametreleri girip hesaplayın.' : 'Enter parameters and calculate to see the graph.'}
            </div>
          )}
        </div>
      </div>

      {/* --- VERİ TABLOLARI --- */}
      {result && (
        <div>
          {/* 1. Dome Information (Özet) */}
          <div style={{ ...containerStyle, marginBottom: '30px' }}>
            <h3 style={{ marginTop: 0 }}>Dome Information</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
              <tbody>
                <tr><td style={{ ...tableCellStyle, fontWeight: 'bold' }}>Dome Type</td><td style={tableCellStyle}>{result.info_summary.dome_type}</td></tr>
                <tr style={{ background: '#fbfcfc' }}><td style={{ ...tableCellStyle, fontWeight: 'bold' }}>Frequency</td><td style={tableCellStyle}>{result.info_summary.frequency}</td></tr>
                <tr><td style={{ ...tableCellStyle, fontWeight: 'bold' }}>Node Count</td><td style={tableCellStyle}>{result.info_summary.node_count}</td></tr>
                <tr style={{ background: '#fbfcfc' }}><td style={{ ...tableCellStyle, fontWeight: 'bold' }}>Member Count</td><td style={tableCellStyle}>{result.info_summary.member_count}</td></tr>
                <tr><td style={{ ...tableCellStyle, fontWeight: 'bold' }}>Group Count</td><td style={tableCellStyle}>{result.info_summary.group_count}</td></tr>
                <tr style={{ background: '#fbfcfc' }}><td style={{ ...tableCellStyle, fontWeight: 'bold' }}>Total Length (m)</td><td style={tableCellStyle}>{result.info_summary.total_length}</td></tr>
                <tr><td style={{ ...tableCellStyle, fontWeight: 'bold' }}>Min Element Length (m)</td><td style={tableCellStyle}>{result.info_summary.min_length}</td></tr>
                <tr style={{ background: '#fbfcfc' }}><td style={{ ...tableCellStyle, fontWeight: 'bold' }}>Max Element Length (m)</td><td style={tableCellStyle}>{result.info_summary.max_length}</td></tr>
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
            {/* 2. Nodes Table */}
            <div style={{ ...containerStyle, flex: '1', minWidth: '300px' }}>
              <h3 style={{ marginTop: 0 }}>Nodes (First 50)</h3>
              <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #eee', borderRadius: '4px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                    <tr><th style={tableHeaderStyle}>Node</th><th style={tableHeaderStyle}>X</th><th style={tableHeaderStyle}>Y</th><th style={tableHeaderStyle}>Z</th></tr>
                  </thead>
                  <tbody>
                    {result.nodes_table.slice(0, 50).map(node => (
                      <tr key={node.id} style={tableRowStyle}>
                        <td style={{ ...tableCellStyle, fontWeight: 'bold' }}>{node.id}</td><td style={tableCellStyle}>{node.x}</td><td style={tableCellStyle}>{node.y}</td><td style={tableCellStyle}>{node.z}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3. Members Table */}
            <div style={{ ...containerStyle, flex: '1', minWidth: '300px' }}>
              <h3 style={{ marginTop: 0 }}>Members (First 50)</h3>
              <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #eee', borderRadius: '4px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                    <tr><th style={tableHeaderStyle}>Member</th><th style={tableHeaderStyle}>Node1</th><th style={tableHeaderStyle}>Node2</th></tr>
                  </thead>
                  <tbody>
                    {result.members_table.slice(0, 50).map(mem => (
                      <tr key={mem.id} style={tableRowStyle}>
                        <td style={{ ...tableCellStyle, fontWeight: 'bold' }}>{mem.id}</td><td style={tableCellStyle}>{mem.node1}</td><td style={tableCellStyle}>{mem.node2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}