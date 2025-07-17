using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using TicketTracker.Models;

namespace TicketTracker.Services
{
    public class CurrentUserService
    {
        private readonly IdentityContext _identityContext;

        public CurrentUserService(IdentityContext identityContext)
        {
            _identityContext = identityContext;
        }

        public async Task<User?> GetCurrentUserAsync(ClaimsPrincipal userPrincipal)
        {
            var username = userPrincipal?.Identity?.Name;
            if (string.IsNullOrEmpty(username))
            {
                return null;
            }

            var user = await _identityContext.Users
                .Where(u => u.UserName == username)
                .Include(u => u.UserGroups)
                    .ThenInclude(ug => ug.Group)
                        .ThenInclude(g => g.QueuePermissions)
                .FirstOrDefaultAsync();

            return user;
        }
    }
}
