using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketTracker.Models;
using TicketTracker.Models.Dtos;
using TicketTracker.Services;

namespace TicketTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TicketsController : ControllerBase
    {
        private readonly TicketContext _context;
        private readonly UserContext _userContext;
        private readonly CurrentUserService _currentUserService;

        public TicketsController(TicketContext context, UserContext userContext, CurrentUserService currentUserService)
        {
            _context = context;
            _userContext = userContext;
            _currentUserService = currentUserService;
        }

        // GET: api/Tickets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TicketReadDto>>> GetTickets()
        {
            // Project to DTO with only queue id + name (no full DB entry)
            var tickets = await _context.Tickets
                .Select(t => new TicketReadDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    CreatedBy = t.CreatedBy,
                    CreatedAt = t.CreatedAt,
                    UpdatedAt = t.UpdatedAt,
                    Status = t.Status,
                    Priority = t.Priority,
                    AssignedTo = t.AssignedTo,
                    TicketQueueId = t.TicketQueueId,
                    TicketQueueName = t.TicketQueue != null ? t.TicketQueue.Name : string.Empty
                })
                .ToListAsync();

            return Ok(tickets);
        }

        // GET: api/Tickets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TicketReadDto>> GetTicket(int id)
        {
            var ticket = await _context.Tickets
                .Where(t => t.Id == id)
                .Select(t => new TicketReadDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    CreatedBy = t.CreatedBy,
                    CreatedAt = t.CreatedAt,
                    UpdatedAt = t.UpdatedAt,
                    Status = t.Status,
                    Priority = t.Priority,
                    AssignedTo = t.AssignedTo,
                    TicketQueueId = t.TicketQueueId,
                    TicketQueueName = t.TicketQueue != null ? t.TicketQueue.Name : string.Empty
                })
                .FirstOrDefaultAsync();

            if (ticket == null)
                return NotFound();

            return ticket;
        }

        // PUT: api/Tickets/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTicket(int id, TicketDto dto)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null) return NotFound();

            // Update fields
            ticket.Title = dto.Title;
            ticket.Description = dto.Description;
            ticket.UpdatedAt = DateTime.UtcNow;
            if (!string.IsNullOrEmpty(dto.Status)) ticket.Status = dto.Status!;
            if (!string.IsNullOrEmpty(dto.Priority)) ticket.Priority = dto.Priority!;
            if (!string.IsNullOrEmpty(dto.AssignedTo)) ticket.AssignedTo = dto.AssignedTo!;

            // Resolve queue if provided
            if (dto.TicketQueueId.HasValue)
            {
                var q = await _context.TicketQueue.FindAsync(dto.TicketQueueId.Value);
                if (q == null) return BadRequest("TicketQueueId not found.");
                ticket.TicketQueueId = q.Id;
                ticket.TicketQueue = null; // ensure EF won't try to insert
            }
            else if (!string.IsNullOrEmpty(dto.TicketQueueName))
            {
                var q = await _context.TicketQueue.FirstOrDefaultAsync(x => x.Name == dto.TicketQueueName);
                if (q == null) return BadRequest("TicketQueueName not found.");
                ticket.TicketQueueId = q.Id;
                ticket.TicketQueue = null;
            }

            _context.Entry(ticket).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Tickets.Any(e => e.Id == id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // POST: api/Tickets
        [HttpPost]
        public async Task<ActionResult<TicketReadDto>> PostTicket(TicketDto dto)
        {
            // Must provide queue id or name
            TicketQueue? queue = null;
            if (dto.TicketQueueId.HasValue)
            {
                queue = await _context.TicketQueue.FindAsync(dto.TicketQueueId.Value);
                if (queue == null) return BadRequest("TicketQueueId not found.");
            }
            else if (!string.IsNullOrEmpty(dto.TicketQueueName))
            {
                queue = await _context.TicketQueue.FirstOrDefaultAsync(q => q.Name == dto.TicketQueueName);
                if (queue == null) return BadRequest("TicketQueueName not found.");
            }
            else
            {
                return BadRequest("TicketQueueId or TicketQueueName must be provided.");
            }

            var ticket = new Ticket
            {
                Title = dto.Title,
                Description = dto.Description,
                CreatedBy = dto.CreatedBy,
                CreatedAt = DateTime.UtcNow,
                Status = dto.Status ?? "Open",
                Priority = dto.Priority ?? "Normal",
                AssignedTo = dto.AssignedTo ?? string.Empty,
                TicketQueueId = queue.Id,
                TicketQueue = null // important: don't attach the queue instance so EF doesn't try to insert
            };

            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();

            // Return read DTO
            var readDto = new TicketReadDto
            {
                Id = ticket.Id,
                Title = ticket.Title,
                Description = ticket.Description,
                CreatedBy = ticket.CreatedBy,
                CreatedAt = ticket.CreatedAt,
                UpdatedAt = ticket.UpdatedAt,
                Status = ticket.Status,
                Priority = ticket.Priority,
                AssignedTo = ticket.AssignedTo,
                TicketQueueId = queue.Id,
                TicketQueueName = queue.Name
            };

            return CreatedAtAction(nameof(GetTicket), new { id = ticket.Id }, readDto);
        }

        // DELETE: api/Tickets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
            {
                return NotFound();
            }

            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
