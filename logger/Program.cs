var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

//REGISTER IN-MEMORY LOGGER STORE
builder.Services.AddSingleton<logger.Services.InMemoryLogStore>();

var app = builder.Build();

app.UseAuthorization();

app.MapControllers();

var port = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrEmpty(port))
{
    app.Urls.Add($"http://*:{port}");
}

app.Run();
