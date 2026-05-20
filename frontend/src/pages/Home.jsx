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
      <section id="research">
        <div className="section-header">
          <div className="section-num"></div>
          <div>
            <div className="section-label">{t('sec_research_label')}</div>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: t('sec_research_title').replace(' ', '<br/>') }}></h2>
          </div>
        </div>
        
        <div className="research-grid">
          <div className="research-card">
            <span className="card-icon">🏛️</span>
            <h3 className="card-title">{t('res_1_title')}</h3>
            <p className="card-desc">{t('res_1_desc')}</p>
          </div>
          <div className="research-card">
            <span className="card-icon">📡</span>
            <h3 className="card-title">{t('res_2_title')}</h3>
            <p className="card-desc">{t('res_2_desc')}</p>
          </div>
          <div className="research-card">
            <span className="card-icon">🖨️</span>
            <h3 className="card-title">{t('res_3_title')}</h3>
            <p className="card-desc">{t('res_3_desc')}</p>
          </div>
        </div>
      </section>

      {/* 2. UYGULAMALAR (TOOLS) */}
      <section id="apps">
        <div className="section-header">
          <div className="section-num"></div>
          <div>
            <div className="section-label">{t('sec_apps_label')}</div>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: t('sec_apps_title').replace(' ', '<br/>') }}></h2>
          </div>
        </div>
        
        <div className="tools-grid">
          <Link to="/uygulamalar" className="tool-card">
            <span className="tool-badge badge-free">{t('badge_free')}</span>
            <h3 className="tool-title">{t('app_all_title')}</h3>
            <p className="tool-desc">{t('app_all_desc')}</p>
          </Link>
          
          <Link to="/uygulama/kiris-analizi" className="tool-card">
             <span className="tool-badge badge-free">{t('badge_free')}</span>
             <h3 className="tool-title">{t('app_beam_title')}</h3>
             <p className="tool-desc">{t('app_beam_desc')}</p>
          </Link>

           <Link to="/uygulama/birim-cevirici" className="tool-card">
             <span className="tool-badge badge-free">{t('badge_free')}</span>
             <h3 className="tool-title">{t('app_unit_title')}</h3>
             <p className="tool-desc">{t('app_unit_desc')}</p>
          </Link>

          <Link to="/uygulama/bilesik-kesit" className="tool-card">
            <span className="tool-badge badge-free">{t('badge_free')}</span>
            <h3 className="tool-title">{t('app_sec_title')}</h3>
            <p className="tool-desc">{t('app_sec_desc')}</p>
          </Link>
        </div>
      </section>

      {/* 3. EKİP */}
      <section id="ekip">
        <div className="section-header">
          <div className="section-num"></div>
          <div>
            <div className="section-label">{t('sec_team_label')}</div>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: t('sec_team_title').replace(' ', '<br/>') }}></h2>
          </div>
        </div>
         <Ekip /> 
      </section>

      {/* 4. HAKKIMIZDA */}
      <section id="about">
         <Hakkimizda />
      </section>

      {/* 5. İLETİŞİM */}
      <section id="contact">
        <div className="contact-section-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
          <div>
            <div className="section-label">{t('sec_contact_label')}</div>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: t('sec_contact_title').replace(' ', '<br/>') }}></h2>
            <div className="contact-info">
              <div className="contact-row">
                <span className="contact-icon">📍</span>
                <div className="contact-detail"><strong>{t('contact_address')}</strong>{t('contact_address_val')}</div>
              </div>
              <div className="contact-row">
                <span className="contact-icon">📧</span>
                <div className="contact-detail"><strong>{t('contact_email')}</strong>info@histechshm.com</div>
              </div>
            </div>
          </div>
          
          {/* FORM ALANI */}
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             <div className="form-group">
               <label>{t('form_name')}</label>
               <input type="text" />
             </div>
             <div className="form-group">
               <label>{t('contact_email')}</label>
               <input type="email" />
             </div>
             <div className="form-group">
               <label>{t('form_msg')}</label>
               <textarea style={{ minHeight: '100px' }}></textarea>
             </div>
             <button type="button" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>{t('btn_send')}</button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">HISTECH-SHM</div>
        <div className="footer-copy">{t('footer_copy')}</div>
      </footer>
    </div>
  );
}