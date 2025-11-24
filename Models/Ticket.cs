using Microsoft.EntityFrameworkCore;
using TicketTracker.Models;

namespace TicketTracker.Models;

public class Ticket
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string CreatedBy { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public string Status { get; set; } = "Open";
    public string Priority { get; set; } = "Normal";
    public string AssignedTo { get; set; } = string.Empty;

    public int TicketQueueId { get; set; }
    public required TicketQueue TicketQueue { get; set; }
}

public class TicketContext(DbContextOptions<TicketContext> options) : DbContext(options)
{
    public DbSet<Ticket> Tickets { get; set; } = null!;

public DbSet<TicketTracker.Models.TicketQueue> TicketQueue { get; set; } = default!;
}