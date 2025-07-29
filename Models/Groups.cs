using Microsoft.EntityFrameworkCore;
using TicketTracker.Models;

namespace TicketTracker.Models
{
    public class Group
    {
        public int Id { get; set; }
        public required string Name { get; set; }

        public ICollection<UserGroup> UserGroups { get; set; } = [];
        public ICollection<GroupCaseQueuePermissionJuntion> QueuePermissions { get; set; } = [];
    }

    public class UserGroup
    {
        public int Id { get; set; }
        public required User User { get; set; }

        public int GroupId { get; set; }
        public required Group Group { get; set; }
    }
}

public class GroupContext(DbContextOptions<GroupContext> options) : DbContext(options)
{
    public DbSet<Group> Groups { get; set; } = null!;
    public DbSet<UserGroup> UserGroups { get; set; } = null!;

public DbSet<TicketTracker.Models.GroupCaseQueuePermissionJuntion> GroupCaseQueuePermissionJuntion { get; set; } = default!;
}