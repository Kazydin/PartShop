import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { fetchParts } from '../api/partsApi';
import { fetchCategories } from '../api/categoriesApi';
import { fetchBrands } from '../api/brandsApi';
import PartCard from '../components/PartCard';

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('default');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(25000);

  const [parts, setParts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [allParts, setAllParts] = useState([]);   // для счётчиков в сайдбаре
  const [loading, setLoading] = useState(true);

  const activeCat = searchParams.get('cat') || '';

  // загрузка справочников один раз
  useEffect(() => {
    fetchCategories().then(setCategories).catch(console.error);
    fetchBrands().then(setBrands).catch(console.error);
    fetchParts().then(setAllParts).catch(console.error);
  }, []);

  // загрузка товаров при изменении фильтров
  useEffect(() => {
    setLoading(true);
    const brand = selectedBrands.length === 1 ? selectedBrands[0] : undefined;
    fetchParts({
      category: activeCat || undefined,
      brand,
      maxPrice: maxPrice < 25000 ? maxPrice : undefined,
      sort: sortBy !== 'default' ? sortBy : undefined,
    })
      .then((data) => {
        // клиентская фильтрация по нескольким брендам (бэк поддерживает один)
        const filtered = selectedBrands.length > 1
          ? data.filter((p) => selectedBrands.includes(p.brand))
          : data;
        setParts(filtered);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeCat, selectedBrands, maxPrice, sortBy]);

  const toggleBrand = (name) =>
    setSelectedBrands((prev) =>
      prev.includes(name) ? prev.filter((b) => b !== name) : [...prev, name]
    );

  const reset = () => {
    setSearchParams({});
    setSelectedBrands([]);
    setMaxPrice(25000);
    setSortBy('default');
  };

  return (
    <main className="catalog-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Каталог запчастей</h1>
          <p className="page-sub">Найдено: {parts.length} позиций</p>
        </div>

        <div className="catalog-layout">
          {/* Sidebar */}
          <aside className="catalog-sidebar">
            <div className="filter-block">
              <h3 className="filter-block__title">Категории</h3>
              <ul className="filter-cats">
                <li>
                  <button
                    className={`filter-cats__item ${!activeCat ? 'active' : ''}`}
                    onClick={() => setSearchParams({})}
                  >
                    Все категории
                    <span className="filter-cats__count">{allParts.length}</span>
                  </button>
                </li>
                {categories.map((c) => (
                  <li key={c.id}>
                    <button
                      className={`filter-cats__item ${activeCat === c.slug ? 'active' : ''}`}
                      onClick={() => setSearchParams({ cat: c.slug })}
                    >
                      {c.icon} {c.name}
                      <span className="filter-cats__count">
                        {allParts.filter((p) => p.category === c.slug).length}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="filter-block">
              <h3 className="filter-block__title">Бренд</h3>
              {brands.map((b) => (
                <label key={b.id} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(b.name)}
                    onChange={() => toggleBrand(b.name)}
                  />
                  <span>{b.name}</span>
                </label>
              ))}
            </div>

            <div className="filter-block">
              <h3 className="filter-block__title">
                Цена до: <strong>{maxPrice.toLocaleString()} ₽</strong>
              </h3>
              <input
                type="range" min={500} max={25000} step={500}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="price-range"
              />
              <div className="price-range__labels">
                <span>500 ₽</span><span>25 000 ₽</span>
              </div>
            </div>

            <button className="btn btn--outline btn--full" onClick={reset}>
              Сбросить фильтры
            </button>
          </aside>

          {/* Main */}
          <div className="catalog-main">
            <div className="catalog-toolbar">
              <div className="catalog-breadcrumb">
                <Link to="/">Главная</Link> / Каталог
                {activeCat && (
                  <> / {categories.find((c) => c.slug === activeCat)?.name}</>
                )}
              </div>
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">По умолчанию</option>
                <option value="price-asc">Цена: по возрастанию</option>
                <option value="price-desc">Цена: по убыванию</option>
                <option value="rating">По рейтингу</option>
              </select>
            </div>

            {loading ? (
              <p className="muted" style={{ padding: '40px 0' }}>Загрузка...</p>
            ) : parts.length === 0 ? (
              <div className="empty-state">
                <span>😕</span>
                <p>Ничего не найдено по заданным фильтрам.</p>
                <button className="btn btn--primary" onClick={reset}>Сбросить</button>
              </div>
            ) : (
              <div className="parts-grid">
                {parts.map((p) => <PartCard key={p.id} part={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
