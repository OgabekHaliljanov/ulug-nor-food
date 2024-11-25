import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Подключаем стили
import img from '../pictures/burger.png'
import img2 from '../pictures/kartoshka.jpg'
import img3 from '../pictures/napitka.jpg' 
import img4 from '../pictures/combo.jpg' 
const Home = () => {
  return (
    <div className="home">
      <div className="home-container">
        <div className="home-text">
          <h1 className="home-title">Welcome to FastFood Express!</h1>
          <p className="home-description">
            The best fast food in town, delivered straight to your door.
          </p>
          <div className="home-buttons">
            <Link to="/menu">
              <button className="home-button">Explore Menu</button>
            </Link>
            <Link to="/cart">
              <button className="home-button">Go to Cart</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Рекомендуемые блюда */}
      <section className="featured">
        <h2 className="section-title">Featured Items</h2>
        <div className="featured-items">
          <div className="item">
          <img className='plll' src={img} alt="Fries" />
            
            <h3>Cheese Burger</h3>
            <p>Juicy beef patty, cheddar cheese, lettuce, and pickles.</p>
            <Link to="/menu">
              <button className="order-button">Order Now</button>
            </Link>
          </div>
          <div className="item">
            <img src={img2} alt="Fries" />
            <h3>French Fries</h3>
            <p>Crispy and golden fries, perfect with your burger.</p>
            <Link to="/menu">
              <button className="order-button">Order Now</button>
            </Link>
          </div>
          <div className="item">
            <img src={img3} alt="Drink" />
            <h3>Refreshing Drink</h3>
            <p>A variety of refreshing drinks to go with your meal.</p>
            <Link to="/menu">
              <button className="order-button">Order Now</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Акции и предложения */}
      <section className="promotions">
        <h2 className="section-title">Special Offers</h2>
        <div className="promotion">
          <img src={img4} alt="Special Offer" />
          <div className="promotion-text">
            <h3>Combo Deal: Burger + Fries</h3>
            <p>Get a burger and fries combo at a special price. Limited time offer!</p>
            <Link to="/menu">
              <button className="order-button">Order Now</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Отзывы клиентов */}
      <section className="testimonials">
        <h2 className="section-title">Customer Reviews</h2>
        <div className="testimonial">
          <p>"FastFood Express always delivers! Best burgers in town."</p>
          <span>- Jane Doe</span>
        </div>
        <div className="testimonial">
          <p>"The fries are crispy and delicious, highly recommend it!"</p>
          <span>- John Smith</span>
        </div>
      </section>

      {/* Подписка на новости */}
      <section className="newsletter">
        <h2 className="section-title">Subscribe for Discounts</h2>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </div>
  );
};

export default Home;
