using Microsoft.EntityFrameworkCore;
using TicketTracker.Models;

namespace TicketTracker.Models;

public class Ticket
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string CreatedBy { get; set; } = string.Empty; // User who created the ticket
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public string Status { get; set; } = "Open"; // Default status
    public string Priority { get; set; } = "Normal"; // Default priority
    public string AssignedTo { get; set; } = string.Empty; // User working on the ticket
    // The ticket Queue this ticket belongs to
    public required TicketQueue TicketQueue { get; set; }
}

public class TicketContext(DbContextOptions<TicketContext> options) : DbContext(options)
{
    public DbSet<Ticket> Tickets { get; set; } = null!;

public DbSet<TicketTracker.Models.TicketQueue> TicketQueue { get; set; } = default!;
}