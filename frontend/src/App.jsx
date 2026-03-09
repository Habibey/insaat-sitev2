import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import Uygulamalar from './pages/uygulamalar';
import Ekip from './pages/ekip';
import Hakkimizda from './pages/hakkimizda';
import GeodezikUygulama from './pages/GeodezikUygulama';

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;