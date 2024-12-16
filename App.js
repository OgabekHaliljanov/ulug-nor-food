import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/menu/Menu';
import Checkout from './components/Checkout/Checkout'; // Corrected from 'Checout' to 'Checkout'
import Navbar from './components/navbar/Navbar';
import Home from './components/Home/Home';
import Admin from './components/Admin/AdminPonel';
import Orders from './components/Orders/OrdersPage';
import { LanguageProvider } from './components/lenguage/LanguageContext';

function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (item) => {
    // Check if the item already exists in the cart
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <LanguageProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Router>
    </LanguageProvider>
    
  );
}

export default App;
