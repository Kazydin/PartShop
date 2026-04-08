# PartShop — интернет-магазин автозапчастей

Учебный проект: фронтенд на **React + Vite**, бэкенд на **ASP.NET Core 8** (C#).

---

## Требования

Перед запуском убедись, что у тебя установлены:

| Инструмент | Версия | Проверка |
|---|---|---|
| [Node.js](https://nodejs.org/) | 18+ | `node --version` |
| [.NET SDK](https://dotnet.microsoft.com/download) | 8.0 | `dotnet --version` |

---

## Запуск проекта

Нужно запустить **два** процесса одновременно — бэкенд и фронтенд. Открой два окна терминала.

### Терминал 1 — бэкенд (C#)

```bash
cd backend
dotnet run
```

Бэкенд запустится на `http://localhost:5100`. Ты увидишь:
```
Now listening on: http://localhost:5100
Application started.
```

Можно проверить прямо в браузере:
- `http://localhost:5100/api/parts` — список запчастей
- `http://localhost:5100/api/categories` — категории
- `http://localhost:5100/api/brands` — бренды

### Терминал 2 — фронтенд (React)

```bash
# Первый раз — установить зависимости
npm install

# Запустить
npm run dev
```

Фронтенд запустится на `http://localhost:5173`. Открой эту ссылку в браузере.

> Важно: бэкенд должен быть запущен, иначе данные не загрузятся.

---

## Структура проекта

```
PartShop/
│
├── backend/                    # Бэкенд на C# (ASP.NET Core)
│   ├── Models/                 # Модели данных (что такое Part, Category, Brand)
│   │   ├── Part.cs
│   │   ├── Category.cs
│   │   └── Brand.cs
│   ├── Data/                   # "База данных" — данные хранятся в списках
│   │   ├── PartsStore.cs       # Список запчастей + методы поиска/фильтрации
│   │   ├── CategoriesStore.cs  # Список категорий
│   │   └── BrandsStore.cs      # Список брендов
│   ├── Endpoints/              # API-маршруты (что отдаётся по каким URL)
│   │   ├── PartsEndpoints.cs
│   │   ├── CategoriesEndpoints.cs
│   │   └── BrandsEndpoints.cs
│   └── Program.cs              # Точка входа: настройка сервера
│
├── src/                        # Фронтенд на React
│   ├── api/                    # Функции для запросов к бэкенду
│   │   ├── client.js           # Базовый fetch
│   │   ├── partsApi.js
│   │   ├── categoriesApi.js
│   │   └── brandsApi.js
│   ├── components/             # Переиспользуемые компоненты
│   │   ├── Header.jsx          # Шапка сайта с поиском
│   │   ├── Footer.jsx
│   │   └── PartCard.jsx        # Карточка одной запчасти
│   ├── context/
│   │   └── CartContext.jsx     # Состояние корзины (глобальное)
│   ├── pages/                  # Страницы приложения
│   │   ├── Home.jsx            # Главная
│   │   ├── Catalog.jsx         # Каталог с фильтрами
│   │   ├── SearchPage.jsx      # Поиск запчастей
│   │   ├── PartDetails.jsx     # Карточка товара
│   │   ├── Cart.jsx            # Корзина
│   │   ├── About.jsx           # О магазине
│   │   └── Contacts.jsx        # Контакты
│   ├── App.jsx                 # Роутинг: какой URL открывает какую страницу
│   └── index.css               # Все стили
│
└── vite.config.js              # Настройка Vite: /api запросы проксируются на бэкенд
```

---

## Как это работает

```
Браузер
  │
  │  открывает http://localhost:5173
  ▼
Фронтенд (React / Vite :5173)
  │
  │  делает запрос GET /api/parts
  │  Vite видит /api → перенаправляет на бэкенд
  ▼
Бэкенд (ASP.NET Core :5100)
  │
  │  PartsStore.Query() → ищет в List<Part>
  │  возвращает JSON
  ▼
Фронтенд получает данные → отрисовывает страницу
```

---

## С чего начать изучение кода

1. **Хочешь понять данные** → `backend/Data/PartsStore.cs`
   Здесь лежат все товары и методы для работы с ними.

2. **Хочешь добавить/изменить API** → `backend/Endpoints/PartsEndpoints.cs`
   Здесь видно, какие URL существуют и что они возвращают.

3. **Хочешь изменить страницу** → `src/pages/`
   Каждый файл — отдельная страница. Начни с `Home.jsx`.

4. **Хочешь изменить карточку товара** → `src/components/PartCard.jsx`

5. **Хочешь изменить стили** → `src/index.css`
   Все стили в одном файле, разбиты по секциям с комментариями.

6. **Хочешь понять роутинг** → `src/App.jsx`
   Здесь видно, какой URL (`/catalog`, `/search` и т.д.) открывает какую страницу.

---

## Полезные команды

```bash
# Фронтенд
npm run dev      # запуск в режиме разработки
npm run build    # сборка для продакшена

# Бэкенд
dotnet run       # запуск
dotnet build     # только сборка (проверить на ошибки)
```
