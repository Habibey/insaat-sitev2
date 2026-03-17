import { Link } from 'react-router-dom';
import Ekip from './Ekip';           
import Hakkimizda from './Hakkimizda'; 

export default function Home() {
  return (
    <div>
      {/* HERO BÖLÜMÜ */}
      <section id="hero">
        <div className="hero-left">
          <div className="hero-tag">Araştırma Grubu — Yapı Mühendisliği</div>
          <h1 className="hero-title">
            <em>Tarihi Yapılar için</em>
            <span className="big">HISTECH</span>
            SHM
          </h1>
          <p className="hero-desc">
            Yapısal sağlık izleme teknolojileri, tarihi yapı restorasyon projeleri, 
            3D baskı yapı sistemleri ve yaşam döngüsü değerlendirme analizleri alanında 
            akademik araştırma ve ticari mühendislik hizmetleri.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#apps" className="btn-primary">Mühendislik Araçları</a>
            {/* BURAYI DÜZELTTİK: Önceden style ile verilen özellikleri sildik, sadece btn-outline class'ını verdik */}
            <a href="#research" className="btn-outline">Araştırma Alanları</a>
          </div>
        </div>

        <div style={{ position: 'relative', overflow: 'hidden' }}>
           <svg viewBox="0 0 600 800" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.3 }}>
            <path d="M150 700 L150 400 Q150 200 300 200 Q450 200 450 400 L450 700" stroke="var(--stone)" strokeWidth="2" fill="none"/>
            <line x1="130" y1="700" x2="130" y2="580" stroke="var(--stone)" strokeWidth="1" strokeDasharray="3 6"/>
            <line x1="470" y1="700" x2="470" y2="580" stroke="var(--stone)" strokeWidth="1" strokeDasharray="3 6"/>
            <circle cx="300" cy="210" r="6" fill="var(--rust)"/>
            <circle cx="150" cy="550" r="6" fill="var(--rust)"/>
          </svg>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-inner">
          <span>Yapısal Sağlık İzleme</span><span className="dot">·</span>
          <span>Tarihi Yapı Restorasyonu</span><span className="dot">·</span>
          <span>3D Baskı Yapı Elemanları</span><span className="dot">·</span>
          <span>Yaşam Döngüsü Analizi</span><span className="dot">·</span>
          <span>Çelik Yapı Sistemleri</span><span className="dot">·</span>
          <span>Performans Değerlendirme</span><span className="dot">·</span>
          <span>Yapısal Sağlık İzleme</span><span className="dot">·</span>
          <span>Tarihi Yapı Restorasyonu</span><span className="dot">·</span>
        </div>
      </div>

      {/* 1. ARAŞTIRMA ALANLARI (Hocanın Tasarımı) */}
      <section id="research" style={{ padding: '6rem 4rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="section-header" style={{ display: 'flex', alignItems: 'flex-end', gap: '2rem', marginBottom: '4rem' }}>
          <div className="section-num" style={{ fontFamily: "'Syne', sans-serif", fontSize: '5rem', fontWeight: 800, color: 'rgba(200,185,154,0.08)', lineHeight: 1, flexShrink: 0 }}>01</div>
          <div>
            <div className="section-label" style={{ fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--rust)', marginBottom: '0.5rem' }}>Araştırma Alanları</div>
            <h2 className="section-title">Disiplinlerarası<br/>Mühendislik Araştırması</h2>
          </div>
        </div>
        
        {/* Izgara Yapısı */}
        <div className="research-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border-color)', border: '1px solid var(--border-color)' }}>
          {/* Kart 1 */}
          <div className="research-card" style={{ background: 'var(--bg-card)', padding: '2.5rem', position: 'relative' }}>
            <span className="card-icon" style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'block' }}>🏛️</span>
            <h3 className="card-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: 'var(--stone)', marginBottom: '0.8rem' }}>Tarihi Yapı Restorasyonu</h3>
            <p className="card-desc" style={{ fontSize: '0.62rem', lineHeight: 1.9, color: 'var(--muted)' }}>Tarihi yapıların belgelenmesi, hasar tespiti, rölöve alımı ve restorasyon projelerinin hazırlanması.</p>
          </div>
          {/* Kart 2 */}
          <div className="research-card" style={{ background: 'var(--bg-card)', padding: '2.5rem', position: 'relative' }}>
            <span className="card-icon" style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'block' }}>📡</span>
            <h3 className="card-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: 'var(--stone)', marginBottom: '0.8rem' }}>Yapısal Sağlık İzleme</h3>
            <p className="card-desc" style={{ fontSize: '0.62rem', lineHeight: 1.9, color: 'var(--muted)' }}>Sensör tabanlı gerçek zamanlı yapı izleme sistemleri, titreşim analizi ve akıllı yapı teknolojileri.</p>
          </div>
          {/* Kart 3 */}
          <div className="research-card" style={{ background: 'var(--bg-card)', padding: '2.5rem', position: 'relative' }}>
            <span className="card-icon" style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'block' }}>🖨️</span>
            <h3 className="card-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: 'var(--stone)', marginBottom: '0.8rem' }}>3D Baskı Yapı Sistemleri</h3>
            <p className="card-desc" style={{ fontSize: '0.62rem', lineHeight: 1.9, color: 'var(--muted)' }}>Seramik, harç ve beton 3D yazıcılar ile yapı elemanı üretimi ve LEGO tipi bağlantı elemanları.</p>
          </div>
        </div>
      </section>

      {/* 2. UYGULAMALAR (TOOLS) */}
      <section id="apps" style={{ padding: '6rem 4rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="section-header" style={{ display: 'flex', alignItems: 'flex-end', gap: '2rem', marginBottom: '4rem' }}>
          <div className="section-num" style={{ fontFamily: "'Syne', sans-serif", fontSize: '5rem', fontWeight: 800, color: 'rgba(200,185,154,0.08)', lineHeight: 1, flexShrink: 0 }}>02</div>
          <div>
            <div className="section-label" style={{ fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--rust)', marginBottom: '0.5rem' }}>Mühendislik Araçları</div>
            <h2 className="section-title">Online Hesaplama<br/>Uygulamaları</h2>
          </div>
        </div>
        
        {/* Uygulama Izgarası */}
        <div className="tools-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
          <Link to="/uygulamalar" className="tool-card" style={{ border: '1px solid var(--border-color)', padding: '2rem', background: 'rgba(200,185,154,0.02)', textDecoration: 'none', display: 'block' }}>
            <span className="tool-badge badge-free" style={{ fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0.2rem 0.5rem', background: 'rgba(42,122,110,0.2)', color: '#4ECDC4', marginBottom: '1rem', display: 'inline-block' }}>Ücretsiz</span>
            <h3 className="tool-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Tüm Uygulamalar</h3>
            <p className="tool-desc" style={{ fontSize: '0.6rem', lineHeight: 1.8, color: 'var(--muted)' }}>Mühendislik hesaplama araçlarımızın tamamını görmek için tıklayın.</p>
          </Link>
          
          <Link to="/uygulama/kiris-analizi" className="tool-card" style={{ border: '1px solid var(--border-color)', padding: '2rem', background: 'rgba(200,185,154,0.02)', textDecoration: 'none', display: 'block' }}>
             <span className="tool-badge badge-free" style={{ fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0.2rem 0.5rem', background: 'rgba(42,122,110,0.2)', color: '#4ECDC4', marginBottom: '1rem', display: 'inline-block' }}>Ücretsiz</span>
             <h3 className="tool-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Kiriş Analizi</h3>
             <p className="tool-desc" style={{ fontSize: '0.6rem', lineHeight: 1.8, color: 'var(--muted)' }}>Basit ve sürekli kirişlerde kesme kuvveti ve moment diyagramı hesabı.</p>
          </Link>

          <Link to="/uygulama/geometrik-ozellikler" className="tool-card" style={{ border: '1px solid var(--border-color)', padding: '2rem', background: 'rgba(200,185,154,0.02)', textDecoration: 'none', display: 'block' }}>
            <span className="tool-badge badge-free" style={{ fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0.2rem 0.5rem', background: 'rgba(42,122,110,0.2)', color: '#4ECDC4', marginBottom: '1rem', display: 'inline-block' }}>Ücretsiz</span>
            <h3 className="tool-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Geometrik Özellikler</h3>
            <p className="tool-desc" style={{ fontSize: '0.6rem', lineHeight: 1.8, color: 'var(--muted)' }}>2D geometrik şekillerin alan, ağırlık merkezi ve atalet momenti analizi.</p>
          </Link>

          <Link to="/uygulama/bilesik-kesit" className="tool-card" style={{ border: '1px solid var(--border-color)', padding: '2rem', background: 'rgba(200,185,154,0.02)', textDecoration: 'none', display: 'block' }}>
            <span className="tool-badge badge-free" style={{ fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0.2rem 0.5rem', background: 'rgba(42,122,110,0.2)', color: '#4ECDC4', marginBottom: '1rem', display: 'inline-block' }}>Ücretsiz</span>
            <h3 className="tool-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Bileşik Kesit (Steiner)</h3>
            <p className="tool-desc" style={{ fontSize: '0.6rem', lineHeight: 1.8, color: 'var(--muted)' }}>I, T, U, L çelik profillerinin atalet momentlerinin Steiner teoremi ile hesabı.</p>
          </Link>
        </div>
      </section>

      {/* 3. EKİP (Senin dinamik bileşenin) */}
      <section id="ekip" style={{ padding: '6rem 4rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="section-header" style={{ display: 'flex', alignItems: 'flex-end', gap: '2rem', marginBottom: '4rem' }}>
          <div className="section-num" style={{ fontFamily: "'Syne', sans-serif", fontSize: '5rem', fontWeight: 800, color: 'rgba(200,185,154,0.08)', lineHeight: 1, flexShrink: 0 }}>03</div>
          <div>
            <div className="section-label" style={{ fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--rust)', marginBottom: '0.5rem' }}>Araştırma Ekibi</div>
            <h2 className="section-title">Akademik<br/>Kadro</h2>
          </div>
        </div>
         <Ekip /> 
      </section>

      {/* 4. HAKKIMIZDA (Senin dinamik bileşenin) */}
      <section id="about" style={{ padding: '6rem 4rem', maxWidth: '1400px', margin: '0 auto' }}>
         <Hakkimizda />
      </section>

      {/* 5. İLETİŞİM (Hocanın Tasarımı) */}
      <section id="contact" style={{ padding: '6rem 4rem', maxWidth: '1400px', margin: '0 auto', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
          <div>
            <div className="section-label" style={{ fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--rust)', marginBottom: '0.5rem' }}>İletişim</div>
            <h2 className="section-title">Proje & İşbirliği<br/>Teklifi</h2>
            <div className="contact-info" style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div className="contact-row" style={{ display: 'flex', gap: '1rem' }}>
                <span className="contact-icon" style={{ color: 'var(--rust)' }}>📍</span>
                <div className="contact-detail" style={{ fontSize: '0.62rem', color: 'var(--muted)' }}><strong style={{ color: 'var(--stone)', display: 'block', textTransform: 'uppercase' }}>Adres</strong>İnşaat Mühendisliği Bölümü</div>
              </div>
              <div className="contact-row" style={{ display: 'flex', gap: '1rem' }}>
                <span className="contact-icon" style={{ color: 'var(--rust)' }}>📧</span>
                <div className="contact-detail" style={{ fontSize: '0.62rem', color: 'var(--muted)' }}><strong style={{ color: 'var(--stone)', display: 'block', textTransform: 'uppercase' }}>E-posta</strong>info@histechshm.com</div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}><label style={{ fontSize: '0.55rem', textTransform: 'uppercase', color: 'var(--muted)' }}>Ad Soyad</label><input type="text" style={{ padding: '0.7rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-main)' }} /></div>
             <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}><label style={{ fontSize: '0.55rem', textTransform: 'uppercase', color: 'var(--muted)' }}>E-posta</label><input type="email" style={{ padding: '0.7rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-main)' }} /></div>
             <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}><label style={{ fontSize: '0.55rem', textTransform: 'uppercase', color: 'var(--muted)' }}>Mesaj</label><textarea style={{ padding: '0.7rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-main)', minHeight: '100px' }}></textarea></div>
             <button className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Mesaj Gönder</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '2rem 4rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="footer-logo" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: 'var(--stone)' }}>HISTECH-SHM</div>
        <div className="footer-copy" style={{ fontSize: '0.55rem', color: 'var(--muted)', letterSpacing: '0.15em' }}>© 2026 HISTECH-SHM Araştırma Grubu · Tüm hakları saklıdır.</div>
      </footer>
    </div>
  );
}