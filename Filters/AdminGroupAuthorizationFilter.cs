using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace TicketTracker.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public class AdminGroupAuthorizationAttribute : Attribute, IAsyncAuthorizationFilter
    {
        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            var user = context.HttpContext.User;
            if (!user.Identity?.IsAuthenticated ?? true)
            {
                context.Result = new ForbidResult();
                return;
            }

            // Check for "Group" claim with value "admin" (case-insensitive)
            var isAdmin = user.Claims.Any(c => c.Type == "Group" && c.Value.Equals("admin", StringComparison.OrdinalIgnoreCase));
            if (!isAdmin)
            {
                context.Result = new ForbidResult();
            }
        }
    }
}
