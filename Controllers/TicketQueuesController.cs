using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketTracker.Filters;
using TicketTracker.Models;

namespace TicketTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TicketQueuesController : ControllerBase
    {
        private readonly TicketContext _context;

        public TicketQueuesController(TicketContext context)
        {
            _context = context;
        }

        // GET: api/TicketQueues
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TicketQueue>>> GetTicketQueue()
        {
            return await _context.TicketQueue.ToListAsync();
        }

        // GET: api/TicketQueues/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TicketQueue>> GetTicketQueue(int id)
        {
            var ticketQueue = await _context.TicketQueue.FindAsync(id);

            if (ticketQueue == null)
            {
                return NotFound();
            }

            return ticketQueue;
        }

        // PUT: api/TicketQueues/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [AdminGroupAuthorization]
        public async Task<IActionResult> PutTicketQueue(int id, TicketQueue ticketQueue)
        {
            if (id != ticketQueue.Id)
            {
                return BadRequest();
            }

            _context.Entry(ticketQueue).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketQueueExists(id))
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

        // POST: api/TicketQueues
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [AdminGroupAuthorization]
        public async Task<ActionResult<TicketQueue>> PostTicketQueue(TicketQueue ticketQueue)
        {
            _context.TicketQueue.Add(ticketQueue);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTicketQueue", new { id = ticketQueue.Id }, ticketQueue);
        }

        // DELETE: api/TicketQueues/5
        [HttpDelete("{id}")]
        [AdminGroupAuthorization]
        public async Task<IActionResult> DeleteTicketQueue(int id)
        {
            var ticketQueue = await _context.TicketQueue.FindAsync(id);
            if (ticketQueue == null)
            {
                return NotFound();
            }

            _context.TicketQueue.Remove(ticketQueue);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TicketQueueExists(int id)
        {
            return _context.TicketQueue.Any(e => e.Id == id);
        }
    }
}
