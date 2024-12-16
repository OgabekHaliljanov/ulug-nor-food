import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TiShoppingCart } from "react-icons/ti";
import { useLanguage } from '../lenguage/LanguageContext'; // Import the hook
import './Menu.css';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState('');
  const [passwordPromptVisible, setPasswordPromptVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [tapCount, setTapCount] = useState(0);
  const navigate = useNavigate();
  const { language } = useLanguage(); // Access current language

  // Fetch menu items function
  const fetchMenuItems = () => {
    fetch('http://localhost:8080/api/foods')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMenuItems(data.data);
        }
      })
      .catch((err) => console.error(err));
  };

  // Fetching menu items on mount and setting up polling
  useEffect(() => {
    fetchMenuItems();

    // Poll the server every 10 seconds for updates
    const intervalId = setInterval(() => {
      fetchMenuItems();
    }, 10000); // 10 seconds

    // Cleanup the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  // Listen for Ctrl + Space to open password prompt
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.ctrlKey && e.code === "Space") {
        setPasswordPromptVisible(true);
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  // Function for handling password submission
  const handlePasswordSubmit = () => {
    const correctPassword = 'admin123'; // Replace with a secure method
    if (password === correctPassword) {
      navigate('/admin'); // Redirect to Admin Panel
    } else {
      alert('Incorrect password');
    }
    setPasswordPromptVisible(false);
    setPassword('');
  };

  // Handle Add to Cart
  const handleAddToCart = (item) => {
    const existingItemIndex = cart.findIndex((cartItem) => cartItem._id === item._id);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
    }
    setNotification(`${item.title} added to cart!`); // Fixed string interpolation
    setTimeout(() => setNotification(''), 3000);
  };

  // Handle Checkout
  const handleCheckout = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/checkout');
  };

  // Handle touch events for mobile (3 taps on the menu)
  const handleTouchStart = () => {
    setTapCount(prevCount => {
      if (prevCount === 2) {
        setPasswordPromptVisible(true);
        return 0; // Reset tap count after triggering the prompt
      }
      return prevCount + 1;
    });

    // Reset tap count if there's a delay between taps (1 second timeout)
    setTimeout(() => {
      setTapCount(0);
    }, 1000);
  };

  return (
    <div className="menu-container">
      {/* Password prompt modal */}
      {passwordPromptVisible && (
        <div className="password-prompt">
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handlePasswordSubmit}>Submit</button>
        </div>
      )}

      <div className="menu" onTouchStart={handleTouchStart}>
        <h2>{language === 'en' ? 'Menu' : 'Menyu'}</h2>
        <div className="menu-items">
          {menuItems.map((item) => (
            <div className="menu-item" key={item._id}>
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <span className="price">${item.price.toFixed(2)}</span>
              <button className="order-button" onClick={() => handleAddToCart(item)}>
                {language === 'en' ? 'Add to Cart' : 'Savatchaga qo\'shish'}
              </button>
            </div>
          ))}
        </div>
        {notification && <div className="notification">{notification}</div>}
        <button className="checkout-button" onClick={handleCheckout}>
          <TiShoppingCart /> {language === 'en' ? 'Go to Checkout' : 'Chekautga o\'tish'}
        </button>
      </div>
    </div>
  );
};

export default Menu;
