using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Configurar o banco de dados
builder.Services.AddDbContext<ApplicationDbContext>(
    options => options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);
builder.Services.AddControllers();
builder.Services.AddScoped<AuthService>();

var jwtKey = builder.Configuration["Jwt:Key"];
var jwtIssuer = builder.Configuration["Jwt:Issuer"];

var key = Encoding.UTF8.GetBytes(jwtKey) ?? throw new ArgumentNullException("Jwt:Key não pode ser nulo!");
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => 
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtIssuer,
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});
var app = builder.Build();

app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();
// Middlewares
app.MapControllers();
app.MapFallback(() => Results.Ok("Pong!"));
app.Run();
