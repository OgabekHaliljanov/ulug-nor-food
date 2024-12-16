import React, { useState, useEffect } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/orders");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Ошибка загрузки заказов:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Заказы</h2>
      {orders.map((order, index) => (
        <div key={index}>
          <h3>Заказ #{index + 1}</h3>
          <p>Адрес: {order.address}</p>
          <p>Телефон: {order.phone}</p>
          <p>Итого: {order.totalPrice}₽</p>
          <ul>
            {order.items.map((item, idx) => (
              <li key={idx}>{item.title} x{item.quantity}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
