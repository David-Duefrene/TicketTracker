using Microsoft.EntityFrameworkCore;
using TicketTracker.Models;

namespace TicketTracker.Models
{
    public class Group
    {
        public int Id { get; set; }
        public required string Name { get; set; }

        // Navigation for the many-to-many relationship
        public ICollection<UserGroup> UserGroups { get; set; } = new List<UserGroup>();

        // existing permission junctions
        public ICollection<GroupCaseQueuePermissionJuntion> QueuePermissions { get; set; } = new List<GroupCaseQueuePermissionJuntion>();
    }

    // Join entity for a many-to-many between User and Group.
    // Use composite key (UserId, GroupId) so a user can belong to multiple groups and a group can have multiple users.
    public class UserGroup
    {
        public int Id { get; set; }
        // IdentityUser uses a string Id by default
        public string UserId { get; set; } = null!;
        public required User User { get; set; }

        public int GroupId { get; set; }
        public required Group Group { get; set; }
    }

    public class GroupContext : DbContext
    {
        public GroupContext(DbContextOptions<GroupContext> options) : base(options) { }

        public DbSet<Group> Groups { get; set; } = null!;
        public DbSet<UserGroup> UserGroups { get; set; } = null!;

        public DbSet<TicketTracker.Models.GroupCaseQueuePermissionJuntion> GroupCaseQueuePermissionJuntion { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure composite primary key for the join table
            modelBuilder.Entity<UserGroup>(b =>
            {
                b.HasKey(ug => new { ug.UserId, ug.GroupId });

                b.HasOne(ug => ug.User)
                 .WithMany(u => u.UserGroups)
                 .HasForeignKey(ug => ug.UserId)
                 .OnDelete(DeleteBehavior.Cascade);

                b.HasOne(ug => ug.Group)
                 .WithMany(g => g.UserGroups)
                 .HasForeignKey(ug => ug.GroupId)
                 .OnDelete(DeleteBehavior.Cascade);
            });

            // If needed, configure GroupCaseQueuePermissionJuntion here as well
        }
    }
}