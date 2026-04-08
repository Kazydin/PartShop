export default function About() {
  return (
    <main className="about-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">О магазине</h1>
          <p className="page-sub">Надёжный партнёр в обслуживании вашего автомобиля с 2015 года</p>
        </div>

        <div className="about-hero">
          <div className="about-hero__text">
            <h2>Кто мы такие</h2>
            <p>
              PartShop — интернет-магазин автозапчастей, который работает с 2015 года.
              За это время мы обслужили более 150 000 клиентов по всей России.
              Наша миссия — сделать обслуживание автомобиля простым, быстрым и доступным.
            </p>
            <p>
              В нашем ассортименте более 10 000 наименований запчастей для европейских,
              японских, корейских и отечественных автомобилей. Мы работаем с официальными
              дистрибьюторами и напрямую с производителями, что гарантирует подлинность
              и качество каждого товара.
            </p>
          </div>
          <div className="about-hero__stats">
            {[
              { val: '150 000+', label: 'Довольных клиентов' },
              { val: '10 000+', label: 'Позиций в каталоге' },
              { val: '500+', label: 'Брендов-партнёров' },
              { val: '9 лет', label: 'Опыта на рынке' },
            ].map((s) => (
              <div key={s.label} className="about-stat">
                <span className="about-stat__val">{s.val}</span>
                <span className="about-stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="about-section">
          <h2>Наши преимущества</h2>
          <div className="about-advantages">
            {[
              {
                icon: '✅',
                title: 'Только оригинальные запчасти и качественные аналоги',
                text: 'Мы проверяем каждого поставщика и не работаем с подделками. Все запчасти имеют сертификаты соответствия.',
              },
              {
                icon: '🔍',
                title: 'Помощь с подбором',
                text: 'Наши специалисты помогут подобрать запчасть по VIN-номеру, госномеру или параметрам автомобиля. Звоните или пишите!',
              },
              {
                icon: '💳',
                title: 'Удобная оплата',
                text: 'Принимаем оплату картой, наличными и переводом. Работаем с юридическими лицами по договору.',
              },
              {
                icon: '🔄',
                title: 'Простой возврат',
                text: '14 дней на возврат товара надлежащего качества без лишних вопросов. Брак — обменяем или вернём деньги.',
              },
              {
                icon: '🚚',
                title: 'Быстрая доставка',
                text: 'Своя курьерская служба в Москве. Доставка в регионы через СДЭК, Почту России и другие службы.',
              },
              {
                icon: '📱',
                title: 'Всегда на связи',
                text: 'Поддержка 7 дней в неделю по телефону, WhatsApp, Telegram и email. Отвечаем в течение 15 минут.',
              },
            ].map((a) => (
              <div key={a.title} className="about-advantage">
                <span className="about-advantage__icon">{a.icon}</span>
                <div>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-section">
          <h2>Команда</h2>
          <div className="team-grid">
            {[
              { name: 'Алексей Петров', role: 'Основатель и директор', exp: '20 лет в авторемонте' },
              { name: 'Мария Соколова', role: 'Руководитель отдела закупок', exp: '12 лет опыта' },
              { name: 'Дмитрий Волков', role: 'Технический консультант', exp: 'Мастер-диагност' },
              { name: 'Анна Кузнецова', role: 'Служба поддержки', exp: '5 лет в e-commerce' },
            ].map((m) => (
              <div key={m.name} className="team-member">
                <div className="team-member__avatar">
                  {m.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <h4>{m.name}</h4>
                <p className="team-member__role">{m.role}</p>
                <p className="team-member__exp muted">{m.exp}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
