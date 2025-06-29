using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicketTracker.Models;

namespace TicketTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GroupCaseQueuePermissionJuntionsController : ControllerBase
    {
        private readonly GroupContext _context;

        public GroupCaseQueuePermissionJuntionsController(GroupContext context)
        {
            _context = context;
        }

        // GET: api/GroupCaseQueuePermissionJuntions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GroupCaseQueuePermissionJuntion>>> GetGroupCaseQueuePermissionJuntion()
        {
            return await _context.GroupCaseQueuePermissionJuntion.ToListAsync();
        }

        // GET: api/GroupCaseQueuePermissionJuntions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GroupCaseQueuePermissionJuntion>> GetGroupCaseQueuePermissionJuntion(int id)
        {
            var groupCaseQueuePermissionJuntion = await _context.GroupCaseQueuePermissionJuntion.FindAsync(id);

            if (groupCaseQueuePermissionJuntion == null)
            {
                return NotFound();
            }

            return groupCaseQueuePermissionJuntion;
        }

        // PUT: api/GroupCaseQueuePermissionJuntions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGroupCaseQueuePermissionJuntion(int id, GroupCaseQueuePermissionJuntion groupCaseQueuePermissionJuntion)
        {
            if (id != groupCaseQueuePermissionJuntion.Id)
            {
                return BadRequest();
            }

            _context.Entry(groupCaseQueuePermissionJuntion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GroupCaseQueuePermissionJuntionExists(id))
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

        // POST: api/GroupCaseQueuePermissionJuntions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<GroupCaseQueuePermissionJuntion>> PostGroupCaseQueuePermissionJuntion(GroupCaseQueuePermissionJuntion groupCaseQueuePermissionJuntion)
        {
            _context.GroupCaseQueuePermissionJuntion.Add(groupCaseQueuePermissionJuntion);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGroupCaseQueuePermissionJuntion", new { id = groupCaseQueuePermissionJuntion.Id }, groupCaseQueuePermissionJuntion);
        }

        // DELETE: api/GroupCaseQueuePermissionJuntions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGroupCaseQueuePermissionJuntion(int id)
        {
            var groupCaseQueuePermissionJuntion = await _context.GroupCaseQueuePermissionJuntion.FindAsync(id);
            if (groupCaseQueuePermissionJuntion == null)
            {
                return NotFound();
            }

            _context.GroupCaseQueuePermissionJuntion.Remove(groupCaseQueuePermissionJuntion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GroupCaseQueuePermissionJuntionExists(int id)
        {
            return _context.GroupCaseQueuePermissionJuntion.Any(e => e.Id == id);
        }
    }
}
