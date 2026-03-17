import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import Uygulamalar from './pages/uygulamalar';
import Ekip from './pages/Ekip';
import Hakkimizda from './pages/Hakkimizda';
import GeodezikUygulama from './pages/GeodezikUygulama';
import KirisUygulama from './pages/KirisUygulama';
import BilesikKesit from './pages/BilesikKesit';
import BirimDonusturucu from './pages/BirimDonusturucu';
import EkipDetay from './pages/EkipDetay'; // Ekip detay sayfasını import ettik


function App() {
  return (
    <BrowserRouter>
      {/* Navbar her sayfanın üstünde sabit kalacak */}
      <Navbar />
      
      {/* Sayfa içerikleri bu div'in içinde değişecek */}
      <div style={{ padding: '40px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/uygulamalar" element={<Uygulamalar />} />
          <Route path="/ekip" element={<Ekip />} />
          <Route path="/hakkimizda" element={<Hakkimizda />} />
          <Route path="/uygulama/:id" element={<GeodezikUygulama />} />
          <Route path="/uygulama/kiris-analizi" element={<KirisUygulama />} />
          <Route path="/uygulama/bilesik-kesit" element={<BilesikKesit />} />
          <Route path="/uygulama/birim-cevirici" element={<BirimDonusturucu />} />
          <Route path="/ekip/:id" element={<EkipDetay />} />
        
         
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;