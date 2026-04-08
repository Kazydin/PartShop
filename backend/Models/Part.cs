namespace PartShop.Api.Models;

public class Part
{
    public int Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public string Article { get; init; } = string.Empty;
    public string Brand { get; init; } = string.Empty;
    public string Category { get; init; } = string.Empty; // slug
    public string CategoryName { get; init; } = string.Empty;
    public decimal Price { get; init; }
    public decimal? OldPrice { get; init; }
    public int Stock { get; init; }
    public double Rating { get; init; }
    public int ReviewCount { get; init; }
    public List<string> Compatibility { get; init; } = [];
    public string Description { get; init; } = string.Empty;
    public Dictionary<string, string> Specs { get; init; } = [];
    public bool IsNew { get; init; }
    public bool IsBestseller { get; init; }
}