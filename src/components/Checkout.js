import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const [orderHistory, setOrderHistory] = useState(
    JSON.parse(localStorage.getItem('orderHistory')) || []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
  }, [orderHistory]);

  const handleContinueShopping = () => {
    setIsModalOpen(true);
  };

  const handleOrderSubmit = async () => {
    if (address && phone) {
      setLoading(true);

      const orderDetails = {
        address,
        phone,
        location,
        items: orderHistory,
        totalPrice: totalPrice(),
      };

      try {
        await sendOrderToTelegram(orderDetails);
        localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
        setIsModalOpen(false);
        setIsOrderConfirmed(true);
        setOrderHistory([]); // Очищаем корзину после оформления заказа
      } catch (error) {
        alert('Error sending order to Telegram!');
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please fill in both address and phone number!');
    }
  };

  const sendOrderToTelegram = async (orderDetails) => {
    const botToken = '7983333907:AAEszWqQckTjW6Y_G9x_p_uy_TfftZidm6w'; // Замените на токен вашего бота
    const chatId = '6812593469  '; // Замените на ID чата

    const orderMessage = `
      New Order:
      Address: ${orderDetails.address}
      Phone: ${orderDetails.phone}
      Location: Latitude: ${orderDetails.location?.lat}, Longitude: ${orderDetails.location?.lon}
      Total: $${orderDetails.totalPrice}
      Items: ${orderDetails.items.map(item => `${item.name} x${item.quantity}`).join(', ')}
    `;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(orderMessage)}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to send message to Telegram');
    }
  };

  const totalPrice = () => {
    return orderHistory.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ).toFixed(2);
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>

      {isOrderConfirmed ? (
        <div className="order-confirmation">
          <h3>Thank you for your order!</h3>
          <p>Your order has been submitted successfully. Here's what you ordered:</p>
          <ul>
            {orderHistory.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price.toFixed(2)} x {item.quantity} = $
                {(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <h3>Total: ${totalPrice()}</h3>
          <button onClick={() => navigate('/menu')}>Back to Menu</button>
        </div>
      ) : (
        <>
          <div className="order-summary">
            <h3>Order Summary</h3>
            {orderHistory.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul>
                {orderHistory.map((item) => (
                  <li key={item.id} className="order-item">
                    <span>{item.name}</span> - ${item.price.toFixed(2)} x
                    <span>{item.quantity}</span>
                    = ${(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
            )}
            <h3 className="total-price">Total: ${totalPrice()}</h3>
          </div>

          <div className="checkout-actions">
            <button className="continue-shopping-button" onClick={handleContinueShopping}>
              Continue Shopping
            </button>
            <button className="clear-cart-button" onClick={() => setOrderHistory([])}>
              Clear Cart
            </button>
          </div>
        </>
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Enter Your Details</h3>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {location && (
              <div className="location-info">
                <p>Current Location: Latitude {location.lat}, Longitude {location.lon}</p>
              </div>
            )}
            <div className="modal-actions">
              <button onClick={handleOrderSubmit} disabled={loading}>
                {loading ? 'Sending...' : 'Submit Order'}
              </button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;













