using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

using TicketTracker.Filters;
using TicketTracker.Models;

namespace TicketTracker.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly TokenService _tokenService;

        public AuthController(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            TokenService tokenService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AuthUser model)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(model.Username);

                if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
                    return Unauthorized();

                var token = _tokenService.CreateToken(user);
                return Ok(new { token });
            }
            catch (Exception ex) // Fix for CS0120 and CA2241
            {
                Console.WriteLine($"An error occurred during login: {ex}"); // Correctly format the string and use the exception instance
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }

        [HttpPost("register")]
        [TypeFilter(typeof(AdminGroupAuthorizationFilter))]
        public async Task<IActionResult> Register([FromBody] AuthUser model)
        {
            var user = new User { UserName = model.Username };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            var token = _tokenService.CreateToken(user);
            return Ok(new { Token = token });
        }
    }
}
