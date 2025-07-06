using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.DotNet.Scaffolding.Shared;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TicketTracker.Models;
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
builder.Services.AddScoped<TicketTracker.Services.CurrentUserService>();
builder.Services.AddDbContext<IdentityContext>(options =>
    options.UseInMemoryDatabase("Identity"));
builder.Services.AddIdentity<User, IdentityRole>()
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
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
        NameClaimType = ClaimTypes.Name
    };
});

// ? Add CORS service
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            .WithOrigins("http://localhost:5173") // React dev server
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials(); // optional, if using cookies/auth
    });
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

    var defaultAdminUsername = "string"; // Default admin username
    var defaultAdminPassword = "string"; // Default admin password

    // Ensure Admin group exists
    var adminGroup = groupContext.Groups.FirstOrDefault(g => g.Name == defaultAdminUsername);
    if (adminGroup == null)
    {
        adminGroup = new TicketTracker.Models.Group { Name = defaultAdminUsername };
        groupContext.Groups.Add(adminGroup);
        groupContext.SaveChanges();
    }

    // Ensure Admin user exists
    var adminUser = userContext.Users.FirstOrDefault(u => u.UserName == defaultAdminUsername);
    if (adminUser == null)
    {
        adminUser = new TicketTracker.Models.User { UserName = defaultAdminUsername };
        userContext.Users.Add(adminUser);
        userContext.SaveChanges();

        // Create an IdentityUser for the Admin user
        // Ensure Admin IdentityUser exists
        
    }
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
    //var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();
    //var userManager = provider.GetRequiredService<UserManager<User>>();

    var identityAdmin = await userManager.FindByNameAsync(defaultAdminUsername);
    if (identityAdmin == null)
    {
        //identityAdmin = new IdentityUser { UserName = "string" }; // username
        identityAdmin = new User { UserName = defaultAdminUsername }; // username
        await userManager.CreateAsync(identityAdmin, defaultAdminPassword); //password
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

app.UseCors();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
