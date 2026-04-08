import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchPartById, fetchRelatedParts } from '../api/partsApi';
import { useCart } from '../context/CartContext';
import PartCard from '../components/PartCard';

export default function PartDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [part, setPart] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    fetchPartById(id)
      .then((data) => {
        setPart(data);
        return fetchRelatedParts(id);
      })
      .then(setRelated)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <main className="container" style={{ paddingTop: '4rem' }}><p className="muted">Загрузка...</p></main>;

  if (notFound || !part) {
    return (
      <main className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
        <h2>Запчасть не найдена</h2>
        <button className="btn btn--primary" onClick={() => navigate('/catalog')}>В каталог</button>
      </main>
    );
  }

  const discount = part.oldPrice
    ? Math.round((1 - part.price / part.oldPrice) * 100)
    : null;

  return (
    <main className="part-details-page">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Главная</Link><span>/</span>
          <Link to="/catalog">Каталог</Link><span>/</span>
          <Link to={`/catalog?cat=${part.category}`}>{part.categoryName}</Link><span>/</span>
          <span>{part.name}</span>
        </nav>

        <div className="part-detail-layout">
          <div className="part-detail-image">
            <div className="part-detail-image__placeholder">
              🔩
              {part.isNew    && <span className="badge badge--new">Новинка</span>}
              {part.isBestseller && <span className="badge badge--hit">Хит</span>}
              {discount      && <span className="badge badge--discount">−{discount}%</span>}
            </div>
          </div>

          <div className="part-detail-info">
            <p className="part-detail-info__brand">{part.brand}</p>
            <h1 className="part-detail-info__name">{part.name}</h1>
            <p className="part-detail-info__article">Артикул: <strong>{part.article}</strong></p>

            <div className="part-detail-info__rating">
              <span className="stars">
                {'★'.repeat(Math.round(part.rating))}{'☆'.repeat(5 - Math.round(part.rating))}
              </span>
              <span>{part.rating}</span>
              <span className="muted">({part.reviewCount} отзывов)</span>
            </div>

            <div className="part-detail-info__price-block">
              <span className="part-detail-info__price">{part.price.toLocaleString()} ₽</span>
              {part.oldPrice && (
                <>
                  <span className="part-detail-info__old-price">{part.oldPrice.toLocaleString()} ₽</span>
                  <span className="part-detail-info__discount">−{discount}%</span>
                </>
              )}
            </div>

            <div className={`part-detail-info__stock ${part.stock < 5 ? 'low' : ''}`}>
              {part.stock < 5
                ? `⚠️ Осталось ${part.stock} шт. — спешите!`
                : `✅ В наличии: ${part.stock} шт.`}
            </div>

            <button
              className="btn btn--primary btn--lg part-detail-info__add"
              onClick={() => { addToCart(part); navigate('/cart'); }}
            >
              🛒 В корзину
            </button>

            <div className="part-detail-info__perks">
              <span>🚚 Доставка от 2 дней</span>
              <span>🔄 Возврат 14 дней</span>
              <span>✅ Гарантия качества</span>
            </div>
          </div>
        </div>

        <div className="part-tabs">
          <div className="part-tabs__section">
            <h2>Описание</h2>
            <p>{part.description}</p>
          </div>
          <div className="part-tabs__section">
            <h2>Характеристики</h2>
            <table className="specs-table">
              <tbody>
                {Object.entries(part.specs).map(([key, val]) => (
                  <tr key={key}>
                    <td className="specs-table__key">{key}</td>
                    <td className="specs-table__val">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="part-tabs__section">
            <h2>Совместимость</h2>
            <ul className="compat-list">
              {part.compatibility.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <section className="section">
            <div className="section__header">
              <h2 className="section__title">Похожие товары</h2>
              <Link to={`/catalog?cat=${part.category}`} className="section__more">Смотреть все →</Link>
            </div>
            <div className="parts-grid">
              {related.map((p) => <PartCard key={p.id} part={p} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
