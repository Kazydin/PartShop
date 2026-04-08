// ================================================================
// DB-эмулятор :: Brands
// ================================================================

using PartShop.Api.Models;

namespace PartShop.Api.Data;

public static class BrandsStore
{
    // ----- таблица -----------------------------------------------
    private static readonly List<Brand> _store =
    [
        new() {Id = 1, Name = "Bosch", Country = "Германия", Logo = "B"},
        new() {Id = 2, Name = "SKF", Country = "Швеция", Logo = "S"},
        new() {Id = 3, Name = "Brembo", Country = "Италия", Logo = "BR"},
        new() {Id = 4, Name = "Continental", Country = "Германия", Logo = "C"},
        new() {Id = 5, Name = "Febi Bilstein", Country = "Германия", Logo = "F"},
        new() {Id = 6, Name = "Denso", Country = "Япония", Logo = "D"},
        new() {Id = 7, Name = "Monroe", Country = "Бельгия", Logo = "M"},
        new() {Id = 8, Name = "NGK", Country = "Япония", Logo = "N"},
        new() {Id = 9, Name = "Valeo", Country = "Франция", Logo = "V"},
        new() {Id = 10, Name = "Mann Filter", Country = "Германия", Logo = "MF"},
    ];

    // ----- запросы -----------------------------------------------
    public static IReadOnlyList<Brand> FindAll() => _store.AsReadOnly();
    public static Brand? FindById(int id) => _store.FirstOrDefault(b => b.Id == id);

    public static Brand? FindByName(string name) =>
        _store.FirstOrDefault(b => b.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
}