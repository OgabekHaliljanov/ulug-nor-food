import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Checkout/Checkout.css';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const TELEGRAM_BOT_TOKEN = "7983333907:AAEszWqQckTjW6Y_G9x_p_uy_TfftZidm6w"; // Replace with your Telegram bot token
  const TELEGRAM_CHAT_ID = "6812593469"; // Replace with your Telegram chat ID

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
    calculateTotalPrice(savedCart);
  }, []);

  const calculateTotalPrice = (cartItems) => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total.toFixed(2));
  };

  const handleIncrease = (itemId) => {
    const updatedCart = cart.map((item) => {
      if (item._id === itemId) {
        item.quantity += 1;
      }
      return item;
    });
    setCart(updatedCart);
    calculateTotalPrice(updatedCart);
  };

  const handleDecrease = (itemId) => {
    const updatedCart = cart.map((item) => {
      if (item._id === itemId && item.quantity > 1) {
        item.quantity -= 1;
      }
      return item;
    });
    setCart(updatedCart);
    calculateTotalPrice(updatedCart);
  };

  const handleRemove = (itemId) => {
    const updatedCart = cart.filter((item) => item._id !== itemId);
    setCart(updatedCart);
    calculateTotalPrice(updatedCart);
  };

  const sendToTelegram = async (cartItems) => {
    const itemsList = cartItems
      .map((item) => `${item.title} (x${item.quantity}): $${(item.price * item.quantity).toFixed(2)}`)
      .join("\n");

    const message = 
      `New Order Received:
      ---------------------
      ${itemsList}
      ---------------------
      Total Price: $${totalPrice}
      Address: ${address}
      Phone: ${phone}`;

    try {
      // Send the order details
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
        }),
      });
      alert("Order sent to Telegram successfully!");
    } catch (error) {
      console.error("Error sending order to Telegram:", error);
      alert("Failed to send order to Telegram.");
    }
  };

  const sendLocationToTelegram = async (latitude, longitude) => {
    try {
      // Send the geolocation
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendLocation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          latitude,
          longitude,
        }),
      });
      alert("Location sent to Telegram successfully!");
    } catch (error) {
      console.error("Error sending location to Telegram:", error);
      alert("Failed to send location to Telegram.");
    }
  };

  const handleProceedToPayment = () => {
    if (!address || !phone) {
      alert("Please provide both address and phone number!");
      return;
    }
    sendToTelegram(cart); // Send the cart details and user information to Telegram
    localStorage.removeItem('cart'); // Clear cart after checkout
    navigate('/'); // Redirect to home or confirmation page
  };

  const handleSendLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          sendLocationToTelegram(latitude, longitude);
        },
        (error) => {
          alert("Unable to fetch location. Please try again.");
          console.error(error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-items">
        {cart.map((item) => (
          <div className="checkout-item" key={item._id}>
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <div className="quantity-controls">
              <button onClick={() => handleDecrease(item._id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrease(item._id)}>+</button>
            </div>
            <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
            <button className="remove-button" onClick={() => handleRemove(item._id)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="total-price">
        <h3>Total Price: ${totalPrice}</h3>
      </div>
      <div className="user-details">
        <input
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={handleSendLocation} className="location-button">Send Location</button>
      </div>
      <button onClick={handleProceedToPayment} className="checkout-button">Proceed to Payment</button>
    </div>
  );
};

export default Checkout;
