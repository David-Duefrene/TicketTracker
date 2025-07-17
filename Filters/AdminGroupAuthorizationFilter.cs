using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace TicketTracker.Filters
{
    public class AdminGroupAuthorizationFilter : IAsyncAuthorizationFilter
    {
        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            var user = context.HttpContext.User;
            if (!user.Identity?.IsAuthenticated ?? true)
            {
                context.Result = new ForbidResult();
                return;
            }

            // Check for "Group" claim with value "admin"
            var isAdmin = user.Claims.Any(c => c.Type == "Group" && c.Value == "Admin");
            if (!isAdmin)
            {
                context.Result = new ForbidResult();
            }
        }
    }
}
