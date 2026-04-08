// ================================================================
// DB-эмулятор :: Parts
// Все данные хранятся в статическом списке _store.
// Методы имитируют SELECT-запросы с фильтрацией и сортировкой.
// ================================================================
using PartShop.Api.Models;

namespace PartShop.Api.Data;

public static class PartsStore
{
    // ----- таблица -----------------------------------------------
    private static readonly List<Part> _store =
    [
        new()
        {
            Id = 1, Name = "Тормозные колодки передние", Article = "BB-7734",
            Brand = "Brembo", Category = "brakes", CategoryName = "Тормозная система",
            Price = 2490, OldPrice = 3100, Stock = 15, Rating = 4.8, ReviewCount = 234,
            Compatibility = ["BMW 3 Series (E90)", "BMW 5 Series (E60)", "BMW X3 (E83)"],
            Description = "Высококачественные тормозные колодки от Brembo — одного из лучших производителей в мире. Обеспечивают надёжное торможение в любых условиях, устойчивы к перегреву и практически бесшумны.",
            Specs = new() { ["Тип"] = "Дисковые", ["Позиция"] = "Передняя ось", ["Толщина"] = "18 мм", ["Материал"] = "Низкометаллические" },
            IsNew = false, IsBestseller = true,
        },
        new()
        {
            Id = 2, Name = "Масляный фильтр", Article = "MF-W712",
            Brand = "Mann Filter", Category = "filters", CategoryName = "Фильтры",
            Price = 490, Stock = 52, Rating = 4.9, ReviewCount = 1023,
            Compatibility = ["Volkswagen Golf", "Audi A4", "Seat Leon", "Skoda Octavia"],
            Description = "Оригинальный масляный фильтр Mann Filter с надёжным клапаном обратного давления. Отличается высокой степенью фильтрации и длительным сроком службы.",
            Specs = new() { ["Тип"] = "Навинчиваемый", ["Диаметр"] = "76 мм", ["Высота"] = "96 мм", ["Давление открытия клапана"] = "0.8 бар" },
            IsNew = false, IsBestseller = true,
        },
        new()
        {
            Id = 3, Name = "Амортизатор передний газовый", Article = "MN-B4-143",
            Brand = "Monroe", Category = "suspension", CategoryName = "Подвеска",
            Price = 4750, OldPrice = 5200, Stock = 8, Rating = 4.6, ReviewCount = 87,
            Compatibility = ["Toyota Camry XV50", "Toyota Camry XV70"],
            Description = "Газонаполненный амортизатор Monroe серии B4 для передней оси. Обеспечивает отличную управляемость и комфорт, адаптирован под российские дороги.",
            Specs = new() { ["Тип"] = "Газовый (двухтрубный)", ["Позиция"] = "Передняя ось", ["Ход штока"] = "150 мм", ["Крепление"] = "Шток/ухо" },
            IsNew = true, IsBestseller = false,
        },
        new()
        {
            Id = 4, Name = "Свеча зажигания Iridium", Article = "NGK-ILKAR7L11",
            Brand = "NGK", Category = "engine", CategoryName = "Двигатель",
            Price = 890, Stock = 120, Rating = 4.9, ReviewCount = 456,
            Compatibility = ["Honda Civic", "Honda CR-V", "Honda Accord"],
            Description = "Свеча зажигания с иридиевым электродом обеспечивает стабильное воспламенение смеси, снижает расход топлива и увеличивает мощность двигателя.",
            Specs = new() { ["Тип"] = "Иридиевая", ["Резьба"] = "M12×1.25", ["Калильное число"] = "7", ["Зазор"] = "1.1 мм" },
            IsNew = false, IsBestseller = true,
        },
        new()
        {
            Id = 5, Name = "Ремень ГРМ комплект", Article = "CT-1028K2",
            Brand = "Continental", Category = "engine", CategoryName = "Двигатель",
            Price = 6800, OldPrice = 7500, Stock = 6, Rating = 4.7, ReviewCount = 312,
            Compatibility = ["Renault Logan", "Renault Sandero", "Dacia Logan", "Lada Largus"],
            Description = "Комплект ремня ГРМ с роликами и помпой от Continental. Надёжная замена в полном составе.",
            Specs = new() { ["Количество зубьев"] = "124", ["Ширина ремня"] = "25.4 мм", ["В комплекте"] = "Ремень, ролик натяжной, ролик обводной, помпа", ["Ресурс"] = "90 000 км" },
            IsNew = false, IsBestseller = false,
        },
        new()
        {
            Id = 6, Name = "Подшипник ступицы задний", Article = "SKF-VKBA3574",
            Brand = "SKF", Category = "suspension", CategoryName = "Подвеска",
            Price = 3200, Stock = 22, Rating = 4.8, ReviewCount = 178,
            Compatibility = ["Ford Focus II", "Ford C-Max", "Volvo S40 II", "Mazda 3 BK"],
            Description = "Ступичный подшипник SKF в сборе с фланцем. Высокая нагрузочная способность и долгий срок службы. Оснащён ABS-датчиком.",
            Specs = new() { ["Тип"] = "Двухрядный конический", ["Внешний диаметр"] = "82 мм", ["Внутренний диаметр"] = "40 мм", ["Датчик ABS"] = "Встроенный" },
            IsNew = false, IsBestseller = false,
        },
        new()
        {
            Id = 7, Name = "Аккумулятор 60 Ah", Article = "BS-S4-005",
            Brand = "Bosch", Category = "electrical", CategoryName = "Электрика",
            Price = 8900, OldPrice = 9700, Stock = 14, Rating = 4.7, ReviewCount = 621,
            Compatibility = ["Универсальный — большинство легковых авто"],
            Description = "Надёжный автомобильный аккумулятор Bosch S4 ёмкостью 60 Ач. Технология Ca/Ca обеспечивает низкий саморазряд и длительный срок службы.",
            Specs = new() { ["Ёмкость"] = "60 Ач", ["Ток холодного пуска (EN)"] = "540 А", ["Технология"] = "Ca/Ca", ["Полярность"] = "Прямая" },
            IsNew = false, IsBestseller = true,
        },
        new()
        {
            Id = 8, Name = "Воздушный фильтр двигателя", Article = "MF-C27030",
            Brand = "Mann Filter", Category = "filters", CategoryName = "Фильтры",
            Price = 650, Stock = 38, Rating = 4.8, ReviewCount = 294,
            Compatibility = ["Mercedes C-Class W204", "Mercedes E-Class W212", "Mercedes GLK X204"],
            Description = "Высокоэффективный воздушный фильтр Mann Filter. Отсеивает пыль, сажу и мелкие частицы.",
            Specs = new() { ["Тип"] = "Панельный", ["Ширина"] = "285 мм", ["Длина"] = "215 мм", ["Высота"] = "50 мм" },
            IsNew = false, IsBestseller = false,
        },
        new()
        {
            Id = 9, Name = "Генератор", Article = "VL-437531",
            Brand = "Valeo", Category = "electrical", CategoryName = "Электрика",
            Price = 18500, OldPrice = 21000, Stock = 3, Rating = 4.5, ReviewCount = 42,
            Compatibility = ["Peugeot 307", "Peugeot 308", "Citroen C4", "Citroen Picasso"],
            Description = "Новый генератор Valeo (не восстановленный). Мощность 150 А, встроенный регулятор напряжения.",
            Specs = new() { ["Мощность"] = "150 А", ["Напряжение"] = "14 В", ["Тип шкива"] = "Обгонная муфта", ["Крепление"] = "2 болта" },
            IsNew = true, IsBestseller = false,
        },
        new()
        {
            Id = 10, Name = "Дворники бескаркасные комплект", Article = "BS-AM450S",
            Brand = "Bosch", Category = "body", CategoryName = "Кузов",
            Price = 1890, OldPrice = 2200, Stock = 45, Rating = 4.6, ReviewCount = 389,
            Compatibility = ["Универсальный — 450 мм / 700 мм"],
            Description = "Бескаркасные дворники Bosch Aerotwin. Аэродинамический дизайн прижимает щётку к стеклу на любой скорости.",
            Specs = new() { ["Тип"] = "Бескаркасные", ["Длина (водитель)"] = "700 мм", ["Длина (пассажир)"] = "450 мм", ["Крепление"] = "Multi-clip (адаптеры в комплекте)" },
            IsNew = false, IsBestseller = true,
        },
        new()
        {
            Id = 11, Name = "Катализатор", Article = "FB-21436",
            Brand = "Febi Bilstein", Category = "exhaust", CategoryName = "Выхлопная система",
            Price = 12400, Stock = 5, Rating = 4.4, ReviewCount = 28,
            Compatibility = ["Opel Astra H", "Opel Zafira B", "Vauxhall Astra"],
            Description = "Каталитический нейтрализатор Febi Bilstein. Нержавеющий корпус, высокоэффективный носитель. Соответствует нормам Евро-4.",
            Specs = new() { ["Стандарт"] = "Евро-4", ["Положение"] = "Перед сажевым фильтром", ["Материал корпуса"] = "Нержавеющая сталь", ["Диаметр трубы"] = "55 мм" },
            IsNew = false, IsBestseller = false,
        },
        new()
        {
            Id = 12, Name = "Стартер", Article = "DN-228000-2480",
            Brand = "Denso", Category = "electrical", CategoryName = "Электрика",
            Price = 14200, OldPrice = 16000, Stock = 7, Rating = 4.7, ReviewCount = 63,
            Compatibility = ["Toyota Corolla E150", "Toyota Auris", "Toyota Avensis T270"],
            Description = "Новый стартер Denso (оригинальный поставщик Toyota). Мощный пусковой ток, тихая работа, длительный ресурс.",
            Specs = new() { ["Мощность"] = "1.4 кВт", ["Напряжение"] = "12 В", ["Количество зубьев шестерни"] = "10", ["Тип"] = "Планетарный" },
            IsNew = false, IsBestseller = false,
        },
    ];

    // ----- запросы -----------------------------------------------

    public static IReadOnlyList<Part> FindAll() => _store.AsReadOnly();

    public static Part? FindById(int id) =>
        _store.FirstOrDefault(p => p.Id == id);

    public static IEnumerable<Part> Query(
        string? category  = null,
        string? brand     = null,
        decimal? maxPrice = null,
        string? sort      = null)
    {
        IEnumerable<Part> q = _store;

        if (!string.IsNullOrWhiteSpace(category))
            q = q.Where(p => p.Category == category);

        if (!string.IsNullOrWhiteSpace(brand))
            q = q.Where(p => p.Brand.Equals(brand, StringComparison.OrdinalIgnoreCase));

        if (maxPrice.HasValue)
            q = q.Where(p => p.Price <= maxPrice.Value);

        q = sort switch
        {
            "price-asc"  => q.OrderBy(p => p.Price),
            "price-desc" => q.OrderByDescending(p => p.Price),
            "rating"     => q.OrderByDescending(p => p.Rating),
            _            => q,
        };

        return q;
    }

    public static IEnumerable<Part> Search(string query)
    {
        if (string.IsNullOrWhiteSpace(query)) return [];

        var q = query.Trim().ToLower();
        return _store.Where(p =>
            p.Name.Contains(q, StringComparison.OrdinalIgnoreCase)         ||
            p.Article.Contains(q, StringComparison.OrdinalIgnoreCase)      ||
            p.Brand.Contains(q, StringComparison.OrdinalIgnoreCase)        ||
            p.CategoryName.Contains(q, StringComparison.OrdinalIgnoreCase) ||
            p.Compatibility.Any(c => c.Contains(q, StringComparison.OrdinalIgnoreCase)));
    }

    public static IEnumerable<Part> GetFeatured(int take = 4) =>
        _store.Where(p => p.IsBestseller).Take(take);

    public static IEnumerable<Part> GetRelated(int id, string category, int take = 4) =>
        _store.Where(p => p.Category == category && p.Id != id).Take(take);
}
