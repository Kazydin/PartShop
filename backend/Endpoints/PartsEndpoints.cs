using PartShop.Api.Data;

namespace PartShop.Api.Endpoints;

public static class PartsEndpoints
{
    public static void MapParts(this WebApplication app)
    {
        var group = app.MapGroup("/api/parts");

        // GET /api/parts?category=brakes&brand=Bosch&maxPrice=5000&sort=price-asc
        group.MapGet("/", (
            string? category = null,
            string? brand = null,
            decimal? maxPrice = null,
            string? sort = null) =>
        {
            var result = PartsStore.Query(category, brand, maxPrice, sort);
            return Results.Ok(result);
        });

        // GET /api/parts/featured
        group.MapGet("/featured", () => Results.Ok(PartsStore.GetFeatured()));

        // GET /api/parts/search?q=тормозные
        group.MapGet("/search", (string? q) =>
        {
            if (string.IsNullOrWhiteSpace(q))
                return Results.Ok(Array.Empty<object>());

            return Results.Ok(PartsStore.Search(q));
        });

        // GET /api/parts/{id}
        group.MapGet("/{id:int}", (int id) =>
        {
            var part = PartsStore.FindById(id);
            return part is null ? Results.NotFound() : Results.Ok(part);
        });

        // GET /api/parts/{id}/related
        group.MapGet("/{id:int}/related", (int id) =>
        {
            var part = PartsStore.FindById(id);
            if (part is null) return Results.NotFound();

            return Results.Ok(PartsStore.GetRelated(id, part.Category));
        });
    }
}