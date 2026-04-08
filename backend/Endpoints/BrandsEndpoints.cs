using PartShop.Api.Data;

namespace PartShop.Api.Endpoints;

public static class BrandsEndpoints
{
    public static void MapBrands(this WebApplication app)
    {
        var group = app.MapGroup("/api/brands");

        // GET /api/brands
        group.MapGet("/", () => Results.Ok(BrandsStore.FindAll()));

        // GET /api/brands/{id}
        group.MapGet("/{id:int}", (int id) =>
        {
            var brand = BrandsStore.FindById(id);
            return brand is null ? Results.NotFound() : Results.Ok(brand);
        });
    }
}
