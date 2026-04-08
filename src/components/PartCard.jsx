import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CATEGORY_COLORS = {
  engine: '#e74c3c',
  brakes: '#c0392b',
  suspension: '#2980b9',
  electrical: '#f39c12',
  body: '#27ae60',
  transmission: '#8e44ad',
  filters: '#16a085',
  exhaust: '#7f8c8d',
};

export default function PartCard({ part }) {
  const { addToCart } = useCart();
  const accent = CATEGORY_COLORS[part.category] || '#e63946';

  return (
    <div className="part-card">
      <div className="part-card__image" style={{ background: `${accent}18` }}>
        <span className="part-card__image-icon" style={{ color: accent }}>
          🔩
        </span>
        {part.isNew && <span className="part-card__badge part-card__badge--new">Новинка</span>}
        {part.isBestseller && (
          <span className="part-card__badge part-card__badge--hit">Хит</span>
        )}
      </div>

      <div className="part-card__body">
        <div className="part-card__meta">
          <span className="part-card__article">Арт. {part.article}</span>
          <span className="part-card__brand">{part.brand}</span>
        </div>

        <Link to={`/parts/${part.id}`} className="part-card__name">
          {part.name}
        </Link>

        <div className="part-card__category" style={{ color: accent }}>
          {part.categoryName}
        </div>

        <div className="part-card__rating">
          {'★'.repeat(Math.round(part.rating))}{'☆'.repeat(5 - Math.round(part.rating))}
          <span className="part-card__rating-val">{part.rating}</span>
          <span className="part-card__review-cnt">({part.reviewCount})</span>
        </div>

        <div className="part-card__price-row">
          <div>
            <span className="part-card__price">{part.price.toLocaleString()} ₽</span>
            {part.oldPrice && (
              <span className="part-card__old-price">{part.oldPrice.toLocaleString()} ₽</span>
            )}
          </div>
          <span className={`part-card__stock ${part.stock < 5 ? 'part-card__stock--low' : ''}`}>
            {part.stock < 5 ? `Осталось ${part.stock}` : 'В наличии'}
          </span>
        </div>

        <button
          className="btn btn--primary part-card__btn"
          onClick={() => addToCart(part)}
        >
          В корзину
        </button>
      </div>
    </div>
  );
}
