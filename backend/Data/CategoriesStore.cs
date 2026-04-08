// ================================================================
// DB-эмулятор :: Categories
// Данные хранятся в статическом списке _store.
// Публичные методы имитируют интерфейс репозитория / ORM.
// ================================================================

using PartShop.Api.Models;

namespace PartShop.Api.Data;

public static class CategoriesStore
{
    // ----- таблица -----------------------------------------------
    private static readonly List<Category> _store =
    [
        new() {Id = 1, Name = "Двигатель", Slug = "engine", Icon = "⚙️", Count = 142},
        new() {Id = 2, Name = "Тормозная система", Slug = "brakes", Icon = "🛑", Count = 87},
        new() {Id = 3, Name = "Подвеска", Slug = "suspension", Icon = "🔧", Count = 203},
        new() {Id = 4, Name = "Электрика", Slug = "electrical", Icon = "⚡", Count = 94},
        new() {Id = 5, Name = "Кузов", Slug = "body", Icon = "🚗", Count = 156},
        new() {Id = 6, Name = "Трансмиссия", Slug = "transmission", Icon = "⛽", Count = 68},
        new() {Id = 7, Name = "Фильтры", Slug = "filters", Icon = "🔬", Count = 45},
        new() {Id = 8, Name = "Выхлопная система", Slug = "exhaust", Icon = "💨", Count = 39},
    ];

    // ----- запросы -----------------------------------------------
    public static IReadOnlyList<Category> FindAll() => _store.AsReadOnly();
    public static Category? FindById(int id) => _store.FirstOrDefault(c => c.Id == id);
    public static Category? FindBySlug(string s) => _store.FirstOrDefault(c => c.Slug == s);
}