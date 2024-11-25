import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import Checkout from './components/Checkout';
import Navbar from './components/Navbar'; // Импортируем Navbar
import Home from './components/Home';

function App() {
  const [orderHistory, setOrderHistory] = useState([]);

  // Функция для добавления товаров в корзину
  const handleOrder = (item) => {
    setOrderHistory((prevHistory) => [...prevHistory, item]);
  };

  return (
    <Router>
      <Navbar /> {/* Используем компонент Navbar */}
      <div className="content" style={{ marginTop: '70px' }}>
        <Routes>
          <Route path="/" element={<h1>Welcome to Fast Food!</h1>} />
          <Route path="/menu" element={<Menu handleOrder={handleOrder} />} />
          <Route path="/home" element={<Home/>} />
          <Route
            path="/checkout"
            element={<Checkout orderHistory={orderHistory} setOrderHistory={setOrderHistory} />}
          />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
