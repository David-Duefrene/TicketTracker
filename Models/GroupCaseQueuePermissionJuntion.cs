namespace TicketTracker.Models
{
    public class GroupCaseQueuePermissionJuntion
    {
        public int Id { get; set; }

        public required string Name { get; set; }

        public required Group Group { get; set; }
        public required TicketQueue TicketQueue { get; set; }

        // TODO make into enums later
        public bool CanCreate { get; set; }
        public bool CanRead { get; set; }
        public bool CanUpdate { get; set; }
        public bool CanDelete { get; set; }
    }
}
