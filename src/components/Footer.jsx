import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__col">
          <div className="footer__logo">
            <span>⚙️</span> PartShop
          </div>
          <p className="footer__desc">
            Интернет-магазин автозапчастей. Более 10 000 позиций в наличии. Работаем с 2015 года.
          </p>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Каталог</h4>
          <ul className="footer__links">
            <li><Link to="/catalog?cat=engine">Двигатель</Link></li>
            <li><Link to="/catalog?cat=brakes">Тормозная система</Link></li>
            <li><Link to="/catalog?cat=suspension">Подвеска</Link></li>
            <li><Link to="/catalog?cat=electrical">Электрика</Link></li>
            <li><Link to="/catalog">Все категории</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Покупателям</h4>
          <ul className="footer__links">
            <li><Link to="/about">О магазине</Link></li>
            <li><Link to="/contacts">Контакты</Link></li>
            <li><Link to="/cart">Корзина</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Контакты</h4>
          <p>📞 +7 (800) 555-35-35</p>
          <p>✉️ info@partshop.ru</p>
          <p>📍 Москва, ул. Моторная, 12</p>
          <p className="footer__schedule">Пн–Пт 9:00–20:00<br />Сб–Вс 10:00–18:00</p>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          © 2026 PartShop. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
