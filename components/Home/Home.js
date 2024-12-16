import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Подключаем стили
import { useLanguage } from '../lenguage/LanguageContext'; // Import language context
import img from '../pictures/burger.png'
import img2 from '../pictures/kartoshka.jpg'
import img3 from '../pictures/napitka.jpg' 
import img4 from '../pictures/combo.jpg' 

const Home = () => {
  const { language } = useLanguage(); // Access current language

  return (
    <div className="home">
      <div className="home-container">
        <div className="home-text">
          <h1 className="home-title">
            {language === 'en' ? 'Welcome to FastFood Express!' : 'Добро пожаловать в FastFood Express!'}
          </h1>
          <p className="home-description">
            {language === 'en' 
              ? 'The best fast food in town, delivered straight to your door.' 
              : 'Лучший фастфуд в городе, доставляем прямо к вам домой.'}
          </p>
          <div className="home-buttons">
            <Link to="/menu">
              <button className="home-button">
                {language === 'en' ? 'Explore Menu' : 'Посмотреть меню'}
              </button>
            </Link>
            <Link to="/cart">
              <button className="home-button">
                {language === 'en' ? 'Go to Cart' : 'Перейти в корзину'}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Items */}
      <section className="featured">
        <h2 className="section-title">
          {language === 'en' ? 'Featured Items' : 'Рекомендуемые блюда'}
        </h2>
        <div className="featured-items">
          <div className="item">
            <img className="plll" src={img} alt="Cheese Burger" />
            <h3>{language === 'en' ? 'Cheese Burger' : 'Чизбургер'}</h3>
            <p>
              {language === 'en' 
                ? 'Juicy beef patty, cheddar cheese, lettuce, and pickles.' 
                : 'Сочный говяжий котлета, чеддер, салат и соленья.'}
            </p>
            <Link to="/menu">
              <button className="order-button">
                {language === 'en' ? 'Order Now' : 'Заказать сейчас'}
              </button>
            </Link>
          </div>
          <div className="item">
            <img src={img2} alt="French Fries" />
            <h3>{language === 'en' ? 'French Fries' : 'Картошка фри'}</h3>
            <p>
              {language === 'en' 
                ? 'Crispy and golden fries, perfect with your burger.' 
                : 'Хрустящие золотистые картошки, идеально подходят к вашему бургеру.'}
            </p>
            <Link to="/menu">
              <button className="order-button">
                {language === 'en' ? 'Order Now' : 'Заказать сейчас'}
              </button>
            </Link>
          </div>
          <div className="item">
            <img src={img3} alt="Refreshing Drink" />
            <h3>{language === 'en' ? 'Refreshing Drink' : 'Освежающий напиток'}</h3>
            <p>
              {language === 'en' 
                ? 'A variety of refreshing drinks to go with your meal.' 
                : 'Разнообразие освежающих напитков для вашего блюда.'}
            </p>
            <Link to="/menu">
              <button className="order-button">
                {language === 'en' ? 'Order Now' : 'Заказать сейчас'}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="promotions">
        <h2 className="section-title">
          {language === 'en' ? 'Special Offers' : 'Специальные предложения'}
        </h2>
        <div className="promotion">
          <img src={img4} alt="Special Offer" />
          <div className="promotion-text">
            <h3>
              {language === 'en' ? 'Combo Deal: Burger + Fries' : 'Комбо: Бургер + Картошка'}
            </h3>
            <p>
              {language === 'en' 
                ? 'Get a burger and fries combo at a special price. Limited time offer!' 
                : 'Получите комбо бургер и картошку по специальной цене. Ограниченное предложение!'}
            </p>
            <Link to="/menu">
              <button className="order-button">
                {language === 'en' ? 'Order Now' : 'Заказать сейчас'}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="testimonials">
        <h2 className="section-title">
          {language === 'en' ? 'Customer Reviews' : 'Отзывы клиентов'}
        </h2>
        <div className="testimonial">
          <p>"FastFood Express always delivers! Best burgers in town."</p>
          <span>- Jane Doe</span>
        </div>
        <div className="testimonial">
          <p>"The fries are crispy and delicious, highly recommend it!"</p>
          <span>- John Smith</span>
        </div>
      </section>

      {/* Subscribe for Discounts */}
      <section className="newsletter">
        <h2 className="section-title">
          {language === 'en' ? 'Subscribe for Discounts' : 'Подпишитесь на скидки'}
        </h2>
        <form className="newsletter-form">
          <input type="email" placeholder={language === 'en' ? 'Enter your email' : 'Введите ваш email'} />
          <button type="submit">
            {language === 'en' ? 'Subscribe' : 'Подписаться'}
          </button>
        </form>
      </section>
    </div>
  );
};

export default Home;
