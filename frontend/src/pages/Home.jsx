import { Link } from 'react-router-dom';
import Ekip from './Ekip';           
import Hakkimizda from './Hakkimizda'; 
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation(); 
  
  return (
    <div>
      {/* HERO BÖLÜMÜ */}
      <section id="hero">
        <div className="hero-left">
          <div className="hero-tag">{t('hero_tag')}</div>
          <h1 className="hero-title">
            <em>{t('hero_title_em')}</em>
            <span className="big">HISTECH</span>
            SHM
          </h1>
          <p className="hero-desc">{t('hero_desc')}</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#apps" className="btn-primary">{t('btn_araclar')}</a>
            <a href="#research" className="btn-outline">{t('btn_arastirma')}</a>
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
          <span>{t('mq_1')}</span><span className="dot">·</span>
          <span>{t('mq_2')}</span><span className="dot">·</span>
          <span>{t('mq_3')}</span><span className="dot">·</span>
          <span>{t('mq_4')}</span><span className="dot">·</span>
          <span>{t('mq_5')}</span><span className="dot">·</span>
          <span>{t('mq_6')}</span><span className="dot">·</span>
          <span>{t('mq_1')}</span><span className="dot">·</span>
          <span>{t('mq_2')}</span><span className="dot">·</span>
        </div>
      </div>

      {/* 1. ARAŞTIRMA ALANLARI */}
      <section id="research" style={{ padding: '6rem 4rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="section-header" style={{ display: 'flex', alignItems: 'flex-end', gap: '2rem', marginBottom: '4rem' }}>
          <div className="section-num" style={{ fontFamily: "'Syne', sans-serif", fontSize: '5rem', fontWeight: 800, color: 'rgba(200,185,154,0.08)', lineHeight: 1, flexShrink: 0 }}>01</div>
          <div>
            <div className="section-label" style={{ fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--rust)', marginBottom: '0.5rem' }}>{t('sec_research_label')}</div>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: t('sec_research_title').replace(' ', '<br/>') }}></h2>
          </div>
        </div>
        
        <div className="research-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border-color)', border: '1px solid var(--border-color)' }}>
          <div className="research-card" style={{ background: 'var(--bg-card)', padding: '2.5rem', position: 'relative' }}>
            <span className="card-icon" style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'block' }}>🏛️</span>
            <h3 className="card-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: 'var(--stone)', marginBottom: '0.8rem' }}>{t('res_1_title')}</h3>
            <p className="card-desc" style={{ fontSize: '0.62rem', lineHeight: 1.9, color: 'var(--muted)' }}>{t('res_1_desc')}</p>
          </div>
          <div className="research-card" style={{ background: 'var(--bg-card)', padding: '2.5rem', position: 'relative' }}>
            <span className="card-icon" style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'block' }}>📡</span>
            <h3 className="card-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: 'var(--stone)', marginBottom: '0.8rem' }}>{t('res_2_title')}</h3>
            <p className="card-desc" style={{ fontSize: '0.62rem', lineHeight: 1.9, color: 'var(--muted)' }}>{t('res_2_desc')}</p>
          </div>
          <div className="research-card" style={{ background: 'var(--bg-card)', padding: '2.5rem', position: 'relative' }}>
            <span className="card-icon" style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'block' }}>🖨️</span>
            <h3 className="card-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: 'var(--stone)', marginBottom: '0.8rem' }}>{t('res_3_title')}</h3>
            <p className="card-desc" style={{ fontSize: '0.62rem', lineHeight: 1.9, color: 'var(--muted)' }}>{t('res_3_desc')}</p>
          </div>
        </div>
      </section>

      {/* 2. UYGULAMALAR (TOOLS) */}
      <section id="apps" style={{ padding: '6rem 4rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="section-header" style={{ display: 'flex', alignItems: 'flex-end', gap: '2rem', marginBottom: '4rem' }}>
          <div className="section-num" style={{ fontFamily: "'Syne', sans-serif", fontSize: '5rem', fontWeight: 800, color: 'rgba(200,185,154,0.08)', lineHeight: 1, flexShrink: 0 }}>02</div>
          <div>
            <div className="section-label" style={{ fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--rust)', marginBottom: '0.5rem' }}>{t('sec_apps_label')}</div>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: t('sec_apps_title').replace(' ', '<br/>') }}></h2>
          </div>
        </div>
        
        <div className="tools-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
          <Link to="/uygulamalar" className="tool-card" style={{ border: '1px solid var(--border-color)', padding: '2rem', background: 'rgba(200,185,154,0.02)', textDecoration: 'none', display: 'block' }}>
            <span className="tool-badge badge-free" style={{ fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0.2rem 0.5rem', background: 'rgba(42,122,110,0.2)', color: '#4ECDC4', marginBottom: '1rem', display: 'inline-block' }}>{t('badge_free')}</span>
            <h3 className="tool-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>{t('app_all_title')}</h3>
            <p className="tool-desc" style={{ fontSize: '0.6rem', lineHeight: 1.8, color: 'var(--muted)' }}>{t('app_all_desc')}</p>
          </Link>
          
          <Link to="/uygulama/kiris-analizi" className="tool-card" style={{ border: '1px solid var(--border-color)', padding: '2rem', background: 'rgba(200,185,154,0.02)', textDecoration: 'none', display: 'block' }}>
             <span className="tool-badge badge-free" style={{ fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0.2rem 0.5rem', background: 'rgba(42,122,110,0.2)', color: '#4ECDC4', marginBottom: '1rem', display: 'inline-block' }}>{t('badge_free')}</span>
             <h3 className="tool-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>{t('app_beam_title')}</h3>
             <p className="tool-desc" style={{ fontSize: '0.6rem', lineHeight: 1.8, color: 'var(--muted)' }}>{t('app_beam_desc')}</p>
          </Link>

          <Link to="/uygulama/geometrik-ozellikler" className="tool-card" style={{ border: '1px solid var(--border-color)', padding: '2rem', background: 'rgba(200,185,154,0.02)', textDecoration: 'none', display: 'block' }}>
            <span className="tool-badge badge-free" style={{ fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0.2rem 0.5rem', background: 'rgba(42,122,110,0.2)', color: '#4ECDC4', marginBottom: '1rem', display: 'inline-block' }}>{t('badge_free')}</span>
            <h3 className="tool-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>{t('app_geo_title')}</h3>
            <p className="tool-desc" style={{ fontSize: '0.6rem', lineHeight: 1.8, color: 'var(--muted)' }}>{t('app_geo_desc')}</p>
          </Link>

          <Link to="/uygulama/bilesik-kesit" className="tool-card" style={{ border: '1px solid var(--border-color)', padding: '2rem', background: 'rgba(200,185,154,0.02)', textDecoration: 'none', display: 'block' }}>
            <span className="tool-badge badge-free" style={{ fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0.2rem 0.5rem', background: 'rgba(42,122,110,0.2)', color: '#4ECDC4', marginBottom: '1rem', display: 'inline-block' }}>{t('badge_free')}</span>
            <h3 className="tool-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>{t('app_sec_title')}</h3>
            <p className="tool-desc" style={{ fontSize: '0.6rem', lineHeight: 1.8, color: 'var(--muted)' }}>{t('app_sec_desc')}</p>
          </Link>
        </div>
      </section>

      {/* 3. EKİP */}
      <section id="ekip" style={{ padding: '6rem 4rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="section-header" style={{ display: 'flex', alignItems: 'flex-end', gap: '2rem', marginBottom: '4rem' }}>
          <div className="section-num" style={{ fontFamily: "'Syne', sans-serif", fontSize: '5rem', fontWeight: 800, color: 'rgba(200,185,154,0.08)', lineHeight: 1, flexShrink: 0 }}>03</div>
          <div>
            <div className="section-label" style={{ fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--rust)', marginBottom: '0.5rem' }}>{t('sec_team_label')}</div>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: t('sec_team_title').replace(' ', '<br/>') }}></h2>
          </div>
        </div>
         <Ekip /> 
      </section>

      {/* 4. HAKKIMIZDA */}
      <section id="about" style={{ padding: '6rem 4rem', maxWidth: '1400px', margin: '0 auto' }}>
         <Hakkimizda />
      </section>

      {/* 5. İLETİŞİM */}
      <section id="contact" style={{ padding: '6rem 4rem', maxWidth: '1400px', margin: '0 auto', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
          <div>
            <div className="section-label" style={{ fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--rust)', marginBottom: '0.5rem' }}>{t('sec_contact_label')}</div>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: t('sec_contact_title').replace(' ', '<br/>') }}></h2>
            <div className="contact-info" style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div className="contact-row" style={{ display: 'flex', gap: '1rem' }}>
                <span className="contact-icon" style={{ color: 'var(--rust)' }}>📍</span>
                <div className="contact-detail" style={{ fontSize: '0.62rem', color: 'var(--muted)' }}><strong style={{ color: 'var(--stone)', display: 'block', textTransform: 'uppercase' }}>{t('contact_address')}</strong>{t('contact_address_val')}</div>
              </div>
              <div className="contact-row" style={{ display: 'flex', gap: '1rem' }}>
                <span className="contact-icon" style={{ color: 'var(--rust)' }}>📧</span>
                <div className="contact-detail" style={{ fontSize: '0.62rem', color: 'var(--muted)' }}><strong style={{ color: 'var(--stone)', display: 'block', textTransform: 'uppercase' }}>{t('contact_email')}</strong>info@histechshm.com</div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}><label style={{ fontSize: '0.55rem', textTransform: 'uppercase', color: 'var(--muted)' }}>{t('form_name')}</label><input type="text" style={{ padding: '0.7rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-main)' }} /></div>
             <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}><label style={{ fontSize: '0.55rem', textTransform: 'uppercase', color: 'var(--muted)' }}>{t('contact_email')}</label><input type="email" style={{ padding: '0.7rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-main)' }} /></div>
             <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}><label style={{ fontSize: '0.55rem', textTransform: 'uppercase', color: 'var(--muted)' }}>{t('form_msg')}</label><textarea style={{ padding: '0.7rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-main)', minHeight: '100px' }}></textarea></div>
             <button className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>{t('btn_send')}</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '2rem 4rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="footer-logo" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: 'var(--stone)' }}>HISTECH-SHM</div>
        <div className="footer-copy" style={{ fontSize: '0.55rem', color: 'var(--muted)', letterSpacing: '0.15em' }}>{t('footer_copy')}</div>
      </footer>
    </div>
  );
}