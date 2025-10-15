using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using TicketTracker.Models;
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
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTickets()
        {
            var user = await _currentUserService.GetCurrentUserAsync(User);
            bool isAdmin = user.UserGroups.Any(ug => ug.Group.Name == "Admin");

            List<Ticket> tickets;
            tickets = await _context.Tickets.ToListAsync();
            /*if (isAdmin)
            {
                tickets = await _context.Tickets.ToListAsync();
            }
            else
            {
                var readableQueueIds = user.UserGroups
                    .SelectMany(ug => ug.Group.QueuePermissions)
                    .Where(qp => qp.CanRead)
                    .Select(qp => qp.TicketQueue.Id)
                    .Distinct()
                    .ToList();

                tickets = await _context.Tickets
                    .Where(t => readableQueueIds.Contains(t.TicketQueue.Id))
                    .ToListAsync();
            }*/

            return Ok(tickets);
        }

        // GET: api/Tickets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);

            if (ticket == null)
            {
                return NotFound();
            }

            return ticket;
        }

        // PUT: api/Tickets/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTicket(int id, Ticket ticket)
        {
            if (id != ticket.Id)
            {
                return BadRequest();
            }

            _context.Entry(ticket).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Tickets
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Ticket>> PostTicket(Ticket ticket)
        {
            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTicket), new { id = ticket.Id }, ticket);
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

        private bool TicketExists(int id)
        {
            return _context.Tickets.Any(e => e.Id == id);
        }
    }
}
