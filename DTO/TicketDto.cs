namespace TicketTracker.DTO;

public class TicketDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string CreatedBy { get; set; } = string.Empty;
    public string? Status { get; set; }
    public string? Priority { get; set; }
    public string? AssignedTo { get; set; }

    // Provide either QueueId or QueueName
    public int? TicketQueueId { get; set; }
    public string? TicketQueueName { get; set; }
}

public class TicketReadDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string CreatedBy { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public string Status { get; set; } = string.Empty;
    public string Priority { get; set; } = string.Empty;
    public string AssignedTo { get; set; } = string.Empty;

    // Minimal queue info
    public int TicketQueueId { get; set; }
    public string TicketQueueName { get; set; } = string.Empty;
}