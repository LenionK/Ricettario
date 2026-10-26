using Api.Data;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();

}

app.UseHttpsRedirection();



app.MapGet("/api/health", async (AppDbContext db) =>
{
    var db_status = await db.Database.CanConnectAsync();
    return Results.Ok(new { api = "ok", db = db_status ? "ok" : "unreachable" });
})
.WithName("GetHealth");

app.MapGet("/api/recipes", async (AppDbContext db) =>
{
    var recipes = await db.Recipes
        .OrderBy(r => r.Title)
        .ToListAsync();
    return Results.Ok(recipes);
})
.WithName("GetRecipes");



app.Run();

