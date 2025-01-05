import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSingup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import PanelDeAdministrador from './Pages/PanelDeAdministrador'
import AcercaDeNostros from './Pages/AcercaDeNosotros'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/nuevo' element={<ShopCategory category="nuevo" />} />
          
          {/* Ruta corregida para Product */}
          <Route path="/product/:productId" element={<Product />} />
          
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSingup />} />
          <Route path='/panelAdministrador' element={<PanelDeAdministrador/>} />
          <Route path='/acercaDeNosotros' element={<AcercaDeNostros/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
