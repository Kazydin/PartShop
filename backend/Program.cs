using PartShop.Api.Endpoints;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()));

var app = builder.Build();

app.UseCors();

// --- маршруты ---
app.MapParts();
app.MapCategories();
app.MapBrands();

app.Run("http://localhost:5100");
