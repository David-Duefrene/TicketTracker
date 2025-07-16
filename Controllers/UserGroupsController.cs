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
    [Obsolete("UserGroupsController is obsolete. Group membership is now managed via claims.")]
    public class UserGroupsController : ControllerBase
    {
        private readonly GroupContext _context;

        public UserGroupsController(GroupContext context)
        {
            _context = context;
        }

        // GET: api/UserGroups
        [HttpGet]
        public ActionResult GetUserGroups()
        {
            return Ok("Group membership is now managed via claims. This endpoint is obsolete.");
        }

        // GET: api/UserGroups/5
        [HttpGet("{id}")]
        public ActionResult GetUserGroup(int id)
        {
            return Ok("Group membership is now managed via claims. This endpoint is obsolete.");
        }

        // PUT: api/UserGroups/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public IActionResult PutUserGroup(int id)
        {
            return Ok("Group membership is now managed via claims. This endpoint is obsolete.");
        }

        // POST: api/UserGroups
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public ActionResult PostUserGroup()
        {
            return Ok("Group membership is now managed via claims. This endpoint is obsolete.");
        }

        // DELETE: api/UserGroups/5
        [HttpDelete("{id}")]
        public IActionResult DeleteUserGroup(int id)
        {
            return Ok("Group membership is now managed via claims. This endpoint is obsolete.");
        }

        private bool UserGroupExists(int id)
        {
            return _context.UserGroups.Any(e => e.Id == id);
        }
    }
}
