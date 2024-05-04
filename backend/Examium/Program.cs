using System.Text;
using Examium.Database;
using Examium.MappingProfiles;
using Examium.Repositories.Implementations;
using Examium.Repositories.Interfaces;
using Examium.Services.Implementations;
using Examium.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add AutoMapper
// Добавьте это в метод ConfigureServices вашего Startup классигшда
builder.Services.AddAutoMapper(typeof(Program)); 


// Add services for repositories and services
builder.Services.AddScoped<IQuestionRepository, QuestionRepository>();
builder.Services.AddScoped<IAreaRepository, AreaRepository>();
builder.Services.AddScoped<IOptionRepository, OptionRepository>();
builder.Services.AddScoped<IQuestionService, QuestionService>();
builder.Services.AddScoped<IAreaService, AreaService>();
builder.Services.AddScoped<IOptionService, OptionService>();

builder.Services.AddScoped<IAdminRegistrationService, AdminRegistrationService>();

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ITokenService>(serviceProvider =>
{
    var configuration = serviceProvider.GetRequiredService<IConfiguration>();
    var secretKey = configuration["Jwt:SecretKey"];
    var issuer = configuration["Jwt:Issuer"];
    var audience = configuration["Jwt:Audience"];
    var expiryInMinutes = configuration.GetValue<int>("Jwt:ExpiryInMinutes");
    return new TokenService(secretKey, issuer, audience, expiryInMinutes);
});



builder.Services.AddDbContext<DataContext>();

// Add authentication and authorization
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"]))
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminPolicy", policy =>
    {
        policy.RequireRole("Admin");
    });
});

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder
            .WithOrigins("http://localhost:3000") // Замените этот URL на URL вашего клиентского приложения
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials(); // Разрешение учетных данных
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

// Enable CORS
app.UseCors("AllowAll");

app.MapControllers();

app.Run();
