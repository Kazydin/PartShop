import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, removeFromCart, updateQty, clearCart, totalPrice } = useCart();
  const [ordered, setOrdered] = useState(false);

  if (ordered) {
    return (
      <main className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
        <div className="order-success">
          <div className="order-success__icon">✅</div>
          <h2>Заказ оформлен!</h2>
          <p>Мы свяжемся с вами в ближайшее время для подтверждения.</p>
          <Link to="/" className="btn btn--primary">На главную</Link>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="container" style={{ paddingTop: '4rem' }}>
        <div className="page-header">
          <h1 className="page-title">Корзина</h1>
        </div>
        <div className="empty-state">
          <span>🛒</span>
          <p>Корзина пуста. Перейдите в каталог и добавьте запчасти.</p>
          <Link to="/catalog" className="btn btn--primary">В каталог</Link>
        </div>
      </main>
    );
  }

  const delivery = totalPrice >= 3000 ? 0 : 350;

  return (
    <main className="cart-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Корзина</h1>
          <button className="btn btn--outline btn--sm" onClick={clearCart}>
            Очистить
          </button>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item__image">🔩</div>
                <div className="cart-item__info">
                  <Link to={`/parts/${item.id}`} className="cart-item__name">
                    {item.name}
                  </Link>
                  <div className="cart-item__meta">
                    <span>Арт. {item.article}</span>
                    <span>{item.brand}</span>
                  </div>
                  <div className="cart-item__price-row">
                    <span className="cart-item__price">
                      {(item.price * item.qty).toLocaleString()} ₽
                    </span>
                    <span className="cart-item__unit-price">
                      {item.price.toLocaleString()} ₽ / шт.
                    </span>
                  </div>
                </div>
                <div className="cart-item__qty">
                  <button
                    className="qty-btn"
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    disabled={item.qty <= 1}
                  >
                    −
                  </button>
                  <span className="qty-val">{item.qty}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQty(item.id, item.qty + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="cart-item__remove"
                  onClick={() => removeFromCart(item.id)}
                  title="Удалить"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <h2 className="cart-summary__title">Итого</h2>
            <div className="cart-summary__row">
              <span>Товары ({items.length})</span>
              <span>{totalPrice.toLocaleString()} ₽</span>
            </div>
            <div className="cart-summary__row">
              <span>Доставка</span>
              <span>{delivery === 0 ? 'Бесплатно' : `${delivery} ₽`}</span>
            </div>
            {delivery > 0 && (
              <p className="cart-summary__delivery-hint">
                Добавьте ещё {(3000 - totalPrice).toLocaleString()} ₽ для бесплатной доставки
              </p>
            )}
            <div className="cart-summary__total">
              <span>Сумма</span>
              <span>{(totalPrice + delivery).toLocaleString()} ₽</span>
            </div>
            <button
              className="btn btn--primary btn--full btn--lg"
              onClick={() => { clearCart(); setOrdered(true); }}
            >
              Оформить заказ
            </button>
            <Link to="/catalog" className="btn btn--outline btn--full">
              Продолжить покупки
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
