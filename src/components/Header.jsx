import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  return (
    <header className="header">
      <div className="header__top">
        <div className="container header__top-inner">
          <span className="header__phone">📞 +7 (800) 555-35-35</span>
          <span className="header__schedule">Пн–Пт 9:00–20:00, Сб–Вс 10:00–18:00</span>
          <span className="header__info">Бесплатная доставка от 3 000 ₽</span>
        </div>
      </div>

      <div className="header__main">
        <div className="container header__main-inner">
          <Link to="/" className="logo">
            <span className="logo__icon">⚙️</span>
            <div className="logo__text">
              <span className="logo__name">PartShop</span>
              <span className="logo__tagline">Запчасти для любого авто</span>
            </div>
          </Link>

          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              className="search-bar__input"
              placeholder="Артикул, название, марка авто..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="search-bar__btn">
              Найти
            </button>
          </form>

          <div className="header__actions">
            <Link to="/cart" className="cart-btn">
              <span className="cart-btn__icon">🛒</span>
              <span className="cart-btn__label">Корзина</span>
              {totalItems > 0 && (
                <span className="cart-btn__badge">{totalItems}</span>
              )}
            </Link>
          </div>
        </div>
      </div>

      <nav className="nav">
        <div className="container">
          <ul className="nav__list">
            <li><Link to="/" className="nav__link">Главная</Link></li>
            <li><Link to="/catalog" className="nav__link">Каталог</Link></li>
            <li><Link to="/search" className="nav__link">Поиск запчастей</Link></li>
            <li><Link to="/about" className="nav__link">О магазине</Link></li>
            <li><Link to="/contacts" className="nav__link">Контакты</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
