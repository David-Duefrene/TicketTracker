using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using TicketTracker.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace TicketTracker.Models
{
    public class User
    {
        public int Id { get; set; }
        public required string UserName { get; set; }
        public ICollection<UserGroup> UserGroups { get; set; } = [];
    }

    public class AuthUser
    {
        [Required]
        public required string Username { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public required string Password { get; set; }
    }
}

public class UserContext : DbContext
{
    public UserContext(DbContextOptions<UserContext> options) : base(options) { }
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Group> Groups { get; set; } = null!;
    public DbSet<UserGroup> UserGroups { get; set; } = null!;
}

public class IdentityContext : IdentityDbContext
{
    public IdentityContext(DbContextOptions<IdentityContext> options)
        : base(options)
    {
    }
}