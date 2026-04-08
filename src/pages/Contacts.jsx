import { useState } from 'react';

export default function Contacts() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="contacts-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Контакты</h1>
          <p className="page-sub">Свяжитесь с нами любым удобным способом</p>
        </div>

        <div className="contacts-layout">
          <div className="contacts-info">
            <div className="contact-block">
              <h3>📍 Адрес</h3>
              <p>г. Москва, ул. Моторная, д. 12, стр. 1</p>
              <p className="muted">Рядом с м. Автозаводская</p>
            </div>

            <div className="contact-block">
              <h3>📞 Телефоны</h3>
              <p><a href="tel:+78005553535">+7 (800) 555-35-35</a> — бесплатно по РФ</p>
              <p><a href="tel:+74951234567">+7 (495) 123-45-67</a> — Москва</p>
            </div>

            <div className="contact-block">
              <h3>✉️ Email</h3>
              <p><a href="mailto:info@partshop.ru">info@partshop.ru</a> — общие вопросы</p>
              <p><a href="mailto:sales@partshop.ru">sales@partshop.ru</a> — заказы и оплата</p>
            </div>

            <div className="contact-block">
              <h3>🕐 Часы работы</h3>
              <table className="schedule-table">
                <tbody>
                  <tr><td>Понедельник–Пятница</td><td>9:00–20:00</td></tr>
                  <tr><td>Суббота</td><td>10:00–18:00</td></tr>
                  <tr><td>Воскресенье</td><td>10:00–18:00</td></tr>
                </tbody>
              </table>
            </div>

            <div className="contact-block">
              <h3>💬 Мессенджеры</h3>
              <div className="messengers">
                <span className="messenger-chip">WhatsApp</span>
                <span className="messenger-chip">Telegram</span>
                <span className="messenger-chip">Viber</span>
              </div>
              <p className="muted">Отвечаем в течение 15 минут в рабочее время</p>
            </div>
          </div>

          <div className="contacts-form-wrap">
            {sent ? (
              <div className="order-success">
                <div className="order-success__icon">✅</div>
                <h3>Сообщение отправлено!</h3>
                <p>Мы ответим вам в ближайшее время.</p>
                <button className="btn btn--outline" onClick={() => setSent(false)}>
                  Отправить ещё
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h2 className="contact-form__title">Написать нам</h2>

                <div className="form-group">
                  <label>Ваше имя *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Иван Иванов"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Телефон *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="mail@example.com"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Сообщение *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Опишите ваш вопрос..."
                  />
                </div>

                <button type="submit" className="btn btn--primary btn--full btn--lg">
                  Отправить сообщение
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Fake map */}
        <div className="fake-map">
          <div className="fake-map__inner">
            <span>🗺️</span>
            <p>Москва, ул. Моторная, 12</p>
          </div>
        </div>
      </div>
    </main>
  );
}
