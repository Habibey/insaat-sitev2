import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const linkStyle = { color: 'var(--muted)', textDecoration: 'none', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase' };

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '1.2rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--nav-bg)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-color)' }}>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.3rem', color: 'var(--stone)', letterSpacing: '0.15em' }}>HISTECH-SHM</span>
        <span style={{ fontSize: '0.55rem', color: 'var(--muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '2px' }}>Yapısal Sağlık İzleme</span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
        {/* LİNKLERİ BURADA DEĞİŞTİRDİK */}
        <a href="/#research" style={linkStyle}>Araştırma</a>
        <a href="/#apps" style={linkStyle}>Uygulamalar</a>
        <a href="/#ekip" style={linkStyle}>Ekip</a>
        <a href="/#about" style={linkStyle}>Hakkımızda</a>
        <a href="/#contact" style={{ ...linkStyle, background: 'var(--rust)', color: 'white', padding: '0.5rem 1.2rem', borderRadius: '2px' }}>İletişim</a>
        
        <button onClick={toggleTheme} style={{ background: 'transparent', border: '1px solid var(--stone)', color: 'var(--stone)', padding: '0.4rem 0.8rem', cursor: 'pointer', borderRadius: '4px', fontFamily: 'DM Mono' }}>
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
}