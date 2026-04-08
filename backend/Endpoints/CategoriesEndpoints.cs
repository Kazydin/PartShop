using PartShop.Api.Data;

namespace PartShop.Api.Endpoints;

public static class CategoriesEndpoints
{
    public static void MapCategories(this WebApplication app)
    {
        var group = app.MapGroup("/api/categories");

        // GET /api/categories
        group.MapGet("/", () => Results.Ok(CategoriesStore.FindAll()));

        // GET /api/categories/{id}
        group.MapGet("/{id:int}", (int id) =>
        {
            var cat = CategoriesStore.FindById(id);
            return cat is null ? Results.NotFound() : Results.Ok(cat);
        });
    }
}
