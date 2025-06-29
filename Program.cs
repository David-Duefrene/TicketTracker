using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using TicketTracker.Models;

using Microsoft.Extensions.DependencyInjection;
using System.Threading.Tasks;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "TicketTracker API", Version = "v1" });

    // ?? Add JWT Bearer token support
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter your JWT token in the format: Bearer {your token here}"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            Array.Empty<string>()
        }
    });
}
);
builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 1;
});
builder.Services.AddDbContext<TicketContext>(options => options.UseInMemoryDatabase("Tickets"));
builder.Services.AddDbContext<UserContext>(options => options.UseInMemoryDatabase("Users"));
builder.Services.AddDbContext<GroupContext>(options => {
    options.UseInMemoryDatabase("Groups");
    //options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
    });

//builder.Services.AddDbContext<GroupContext>(options =>
//    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<TokenService>();
builder.Services.AddDbContext<IdentityContext>(options =>
    options.UseInMemoryDatabase("Identity"));
builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<IdentityContext>()
    .AddDefaultTokenProviders();

var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSettings["Secret"];

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Add default Admin group and user
using (var scope = app.Services.CreateScope())
{
    var userContext = scope.ServiceProvider.GetRequiredService<UserContext>();
    var groupContext = scope.ServiceProvider.GetRequiredService<GroupContext>();

    // Ensure Admin group exists
    var adminGroup = groupContext.Groups.FirstOrDefault(g => g.Name == "Admin");
    if (adminGroup == null)
    {
        adminGroup = new TicketTracker.Models.Group { Name = "Admin" };
        groupContext.Groups.Add(adminGroup);
        groupContext.SaveChanges();
    }

    // Ensure Admin user exists
    var adminUser = userContext.Users.FirstOrDefault(u => u.UserName == "Admin");
    if (adminUser == null)
    {
        adminUser = new TicketTracker.Models.User { UserName = "Admin" };
        userContext.Users.Add(adminUser);
        userContext.SaveChanges();

        // Create an IdentityUser for the Admin user
        // Ensure Admin IdentityUser exists
        
    }
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();

    var identityAdmin = await userManager.FindByNameAsync("Admin");
    if (identityAdmin == null)
    {
        identityAdmin = new IdentityUser { UserName = "Admin" };
        await userManager.CreateAsync(identityAdmin, "Password");
    }

    // Ensure Admin user is in Admin group
    var userGroupExists = userContext.UserGroups.Any(ug => ug.User.Id == adminUser.Id && ug.Group.Id == adminGroup.Id);
    if (!userGroupExists)
    {
        var userGroup = new TicketTracker.Models.UserGroup { User = adminUser, Group = adminGroup, GroupId = adminGroup.Id };
        userContext.UserGroups.Add(userGroup);
        userContext.SaveChanges();
    }
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
