import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchCategories } from '../api/categoriesApi';
import { fetchBrands } from '../api/brandsApi';
import { fetchFeaturedParts } from '../api/partsApi';
import PartCard from '../components/PartCard';

export default function Home() {
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [featured, setFeatured] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories().then(setCategories).catch(console.error);
    fetchBrands().then(setBrands).catch(console.error);
    fetchFeaturedParts().then(setFeatured).catch(console.error);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content">
            <h1 className="hero__title">
              Запчасти для любого<br />автомобиля
            </h1>
            <p className="hero__sub">
              Более 10 000 наименований в наличии. Оригинал и качественный аналог.
              Быстрая доставка по всей России.
            </p>
            <form className="hero__search" onSubmit={handleSearch}>
              <input
                type="text"
                className="hero__search-input"
                placeholder="Введите артикул, название или модель авто..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" className="btn btn--primary btn--lg">
                Найти запчасть
              </button>
            </form>
            <div className="hero__hints">
              <span>Популярные:</span>
              {['тормозные колодки', 'масляный фильтр', 'амортизатор'].map((h) => (
                <button
                  key={h}
                  className="hero__hint-chip"
                  onClick={() => navigate(`/search?q=${encodeURIComponent(h)}`)}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__gear hero__gear--1">⚙️</div>
            <div className="hero__gear hero__gear--2">🔧</div>
            <div className="hero__gear hero__gear--3">🔩</div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="container stats__inner">
          {[
            { val: '10 000+', label: 'Наименований' },
            { val: '500+',    label: 'Брендов' },
            { val: '2 дня',   label: 'Средняя доставка' },
            { val: '9 лет',   label: 'На рынке' },
          ].map((s) => (
            <div key={s.label} className="stat-item">
              <span className="stat-item__val">{s.val}</span>
              <span className="stat-item__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <h2 className="section__title">Категории запчастей</h2>
          {categories.length === 0 ? (
            <p className="muted">Загрузка...</p>
          ) : (
            <div className="categories-grid">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/catalog?cat=${cat.slug}`}
                  className="category-card"
                >
                  <span className="category-card__icon">{cat.icon}</span>
                  <span className="category-card__name">{cat.name}</span>
                  <span className="category-card__count">{cat.count} позиций</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="section section--gray">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Хиты продаж</h2>
            <Link to="/catalog" className="section__more">Весь каталог →</Link>
          </div>
          {featured.length === 0 ? (
            <p className="muted">Загрузка...</p>
          ) : (
            <div className="parts-grid">
              {featured.map((p) => <PartCard key={p.id} part={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* Brands */}
      <section className="section">
        <div className="container">
          <h2 className="section__title">Бренды в наличии</h2>
          {brands.length === 0 ? (
            <p className="muted">Загрузка...</p>
          ) : (
            <div className="brands-row">
              {brands.map((b) => (
                <div key={b.id} className="brand-chip">
                  <span className="brand-chip__logo">{b.logo}</span>
                  <span className="brand-chip__name">{b.name}</span>
                  <span className="brand-chip__country">{b.country}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why us */}
      <section className="section section--dark">
        <div className="container">
          <h2 className="section__title section__title--white">Почему выбирают нас</h2>
          <div className="features-grid">
            {[
              { icon: '✅', title: 'Гарантия качества',  desc: 'Работаем только с проверенными поставщиками и сертифицированными производителями.' },
              { icon: '🚚', title: 'Быстрая доставка',   desc: 'Доставка по Москве за 1 день, по всей России — от 2 до 7 рабочих дней.' },
              { icon: '💰', title: 'Честные цены',       desc: 'Прозрачное ценообразование. Никаких скрытых наценок и переплат.' },
              { icon: '🔄', title: 'Лёгкий возврат',    desc: '14 дней на возврат товара надлежащего качества без вопросов.' },
            ].map((f) => (
              <div key={f.title} className="feature-item">
                <span className="feature-item__icon">{f.icon}</span>
                <h3 className="feature-item__title">{f.title}</h3>
                <p className="feature-item__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
