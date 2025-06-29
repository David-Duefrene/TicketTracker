namespace TicketTracker.Models
{
    public class GroupCaseQueuePermissionJuntion
    {
        public int Id { get; set; }

        public required Group Group { get; set; }
        public required TicketQueue TicketQueue { get; set; }

        public bool CanCreate { get; set; }
        public bool CanRead { get; set; }
        public bool CanUpdate { get; set; }
        public bool CanDelete { get; set; }
    }
}
