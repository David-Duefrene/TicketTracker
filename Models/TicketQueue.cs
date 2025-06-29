namespace TicketTracker.Models
{
    public class TicketQueue
    {
        public int Id { get; set; }
        public required string Name { get; set; }

        public ICollection<GroupCaseQueuePermissionJuntion> GroupPermissions { get; set; } = [];
    }
}
