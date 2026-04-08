namespace PartShop.Api.Models;

public class Category
{
    public int Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public string Slug { get; init; } = string.Empty;
    public string Icon { get; init; } = string.Empty;
    public int Count { get; init; }
}