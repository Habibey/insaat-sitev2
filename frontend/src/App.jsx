import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Uygulamalar from './pages/Uygulamalar';
import Ekip from './pages/Ekip';
import Hakkimizda from './pages/Hakkimizda';
import GeodezikUygulama from './pages/GeodezikUygulama';
import KirisUygulama from './pages/KirisUygulama';
import BilesikKesit from './pages/BilesikKesit';
import BirimDonusturucu from './pages/BirimDonusturucu';
import EkipDetay from './pages/EkipDetay'; 
import GeometrikOzellikler from './pages/GeometrikOzellikler';


function App() {
  return (
    <BrowserRouter>
      {/* Navbar her sayfanın üstünde sabit kalacak */}
      <Navbar />
      
      {/* Sayfa içerikleri bu div'in içinde değişecek */}
      <div style={{ paddingTop: '100px', minHeight: '100vh' }}>        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/uygulamalar" element={<Uygulamalar />} />
          <Route path="/ekip" element={<Ekip />} />
          <Route path="/hakkimizda" element={<Hakkimizda />} />
          <Route path="/uygulama/kiris-analizi" element={<KirisUygulama />} />
          <Route path="/uygulama/bilesik-kesit" element={<BilesikKesit />} />
          <Route path="/uygulama/birim-cevirici" element={<BirimDonusturucu />} />
          <Route path="/uygulama/geometrik-ozellikler" element={<GeometrikOzellikler />} />
          <Route path="/uygulama/:id" element={<GeodezikUygulama />} />
          <Route path="/ekip/:id" element={<EkipDetay />} />
        
         
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;