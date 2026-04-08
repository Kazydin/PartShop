import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchParts } from '../api/partsApi';
import { fetchCategories } from '../api/categoriesApi';
import PartCard from '../components/PartCard';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [activeCategory, setActiveCategory] = useState('');

  const [results, setResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const q = searchParams.get('q') || '';

  useEffect(() => {
    fetchCategories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    if (!q) { setResults([]); return; }
    setLoading(true);
    setActiveCategory('');
    searchParts(q)
      .then(setResults)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [q]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) setSearchParams({ q: query.trim() });
  };

  const categoriesInResults = [...new Set(results.map((p) => p.category))];

  const displayed = activeCategory
    ? results.filter((p) => p.category === activeCategory)
    : results;

  return (
    <main className="search-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Поиск запчастей</h1>
        </div>

        <div className="search-form-card">
          <form onSubmit={handleSubmit} className="search-form">
            <div className="search-form__row">
              <input
                type="text"
                className="search-form__input"
                placeholder="Артикул, название, марка авто, категория..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" className="btn btn--primary btn--lg">Найти</button>
            </div>
          </form>
          <div className="search-hints">
            <span className="search-hints__label">Попробуйте:</span>
            {['BMW', 'тормозные', 'фильтр', 'NGK', 'Toyota'].map((hint) => (
              <button
                key={hint}
                className="hero__hint-chip"
                onClick={() => { setQuery(hint); setSearchParams({ q: hint }); }}
              >
                {hint}
              </button>
            ))}
          </div>
        </div>

        {q && (
          <>
            <div className="search-results-header">
              <h2 className="search-results-title">
                {loading ? 'Поиск...' : results.length === 0
                  ? <>Ничего не найдено по запросу «{q}»</>
                  : <>Найдено: <strong>{results.length}</strong> по запросу «{q}»</>}
              </h2>
            </div>

            {!loading && results.length > 0 && (
              <>
                {categoriesInResults.length > 1 && (
                  <div className="search-cat-tabs">
                    <button
                      className={`search-cat-tab ${!activeCategory ? 'active' : ''}`}
                      onClick={() => setActiveCategory('')}
                    >
                      Все ({results.length})
                    </button>
                    {categoriesInResults.map((slug) => {
                      const cat = categories.find((c) => c.slug === slug);
                      const cnt = results.filter((p) => p.category === slug).length;
                      return (
                        <button
                          key={slug}
                          className={`search-cat-tab ${activeCategory === slug ? 'active' : ''}`}
                          onClick={() => setActiveCategory(slug)}
                        >
                          {cat?.icon} {cat?.name} ({cnt})
                        </button>
                      );
                    })}
                  </div>
                )}
                <div className="parts-grid">
                  {displayed.map((p) => <PartCard key={p.id} part={p} />)}
                </div>
              </>
            )}

            {!loading && results.length === 0 && (
              <div className="empty-state">
                <span>🔍</span>
                <p>Попробуйте изменить запрос или&nbsp;
                  <Link to="/catalog">перейдите в каталог</Link>.
                </p>
              </div>
            )}
          </>
        )}

        {!q && (
          <div className="search-idle">
            <h3>Как искать?</h3>
            <ul>
              <li>По <strong>артикулу</strong> — например, <code>MF-W712</code></li>
              <li>По <strong>названию</strong> — например, <code>тормозные колодки</code></li>
              <li>По <strong>бренду</strong> — например, <code>Bosch</code></li>
              <li>По <strong>марке авто</strong> — например, <code>BMW</code>, <code>Toyota Camry</code></li>
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
