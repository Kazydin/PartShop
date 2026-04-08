import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import SearchPage from './pages/SearchPage';
import PartDetails from './pages/PartDetails';
import Cart from './pages/Cart';
import About from './pages/About';
import Contacts from './pages/Contacts';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/parts/:id" element={<PartDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
