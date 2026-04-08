namespace PartShop.Api.Models;

public class Brand
{
    public int Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public string Country { get; init; } = string.Empty;
    public string Logo { get; init; } = string.Empty;
}