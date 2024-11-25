import React, { useState, useEffect } from 'react';
import './Menu.css';
import img from '../pictures/burger.png'
const Menu = () => {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: 'Cheeseburger',
      description: 'A tasty cheeseburger with cheddar cheese.',
      price: 5.99,
       image:  {img}
    },
    {
      id: 2,
      name: 'Vegan Burger',
      description: 'A delicious vegan burger with plant-based patty.',
      price: 6.49,
       image: '../pictures/burger.png'
    },
    {
      id: 3,
      name: 'Classic Burger',
      description: 'A classic burger with fresh beef patty.',
      price: 4.99,
       image: '/images/cheeseburger.jpg'
    },
    {
      id: 4,
      name: 'Chicken Burger',
      description: 'A crispy chicken burger with lettuce and mayo.',
      price: 6.99,
       image: '/images/cheeseburger.jpg'
    },
    {
      id: 5,
      name: 'Double Bacon Burger',
      description: 'Double beef patty with crispy bacon.',
      price: 8.99,
       image: '/images/cheeseburger.jpg'
    },
    {
      id: 6,
      name: 'Fish Burger',
      description: 'A fish burger with tartar sauce.',
      price: 7.49,
       image: '/images/cheeseburger.jpg'
    },
    {
      id: 7,
      name: 'Cheese Fries',
      description: 'Crispy fries topped with melted cheese.',
      price: 3.49,
       image: '/images/cheeseburger.jpg'
    },
    {
      id: 8,
      name: 'Onion Rings',
      description: 'Golden, crispy onion rings served with dipping sauce.',
      price: 2.99,
       image: '/images/cheeseburger.jpg'
    },
    {
      id: 9,
      name: 'Milkshake',
      description: 'A creamy vanilla milkshake.',
      price: 4.29,
       image: '/images/cheeseburger.jpg'
    },
    {
      id: 10,
      name: 'Fried Chicken',
      description: 'Juicy fried chicken served with sides.',
      price: 7.99,
       image: '/images/cheeseburger.jpg'
    },
  ]);

  const [orderHistory, setOrderHistory] = useState(
    JSON.parse(localStorage.getItem('orderHistory')) || []
  );
  const [notification, setNotification] = useState('');

  const handleAddToCart = (item) => {
    const updatedOrderHistory = [...orderHistory];
    const itemIndex = updatedOrderHistory.findIndex((orderItem) => orderItem.id === item.id);

    if (itemIndex !== -1) {
      updatedOrderHistory[itemIndex].quantity += 1;
    } else {
      updatedOrderHistory.push({ ...item, quantity: 1 });
    }

    setOrderHistory(updatedOrderHistory);
    localStorage.setItem('orderHistory', JSON.stringify(updatedOrderHistory));

    // Показ уведомления
    setNotification(`${item.name} added to cart!`);
    setTimeout(() => setNotification(''), 3000); // Убираем уведомление через 3 секунды
  };

  return (
    <div className="menu">
      <h2>Menu</h2>
      <div className="menu-items">
        {menuItems.map((item) => (
          <div className="menu-item" key={item.id}>
            <img src={item.image} alt={item.name} /> 
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <span className="price">${item.price.toFixed(2)}</span>
            <button className="order-button" onClick={() => handleAddToCart(item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
};

export default Menu;
