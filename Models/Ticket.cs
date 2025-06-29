using Microsoft.EntityFrameworkCore;
using TicketTracker.Models;

namespace TicketTracker.Models;

public class Ticket
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public string Status { get; set; } = "Open"; // Default status
    public string Priority { get; set; } = "Normal"; // Default priority
    public string AssignedTo { get; set; } = string.Empty;
    // Additional properties can be added as needed
}

public class TicketContext(DbContextOptions<TicketContext> options) : DbContext(options)
{
    public DbSet<Ticket> Tickets { get; set; } = null!;

public DbSet<TicketTracker.Models.TicketQueue> TicketQueue { get; set; } = default!;
}