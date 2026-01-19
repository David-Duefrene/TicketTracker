using Humanizer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TicketTracker.DTO;
using TicketTracker.Filters;
using TicketTracker.Models;

public class TokenService
{
    private readonly IConfiguration _configuration;
    private readonly UserManager<User> _userManager;

    public TokenService(IConfiguration configuration, UserManager<User> userManager)
    {
        _configuration = configuration;
        _userManager = userManager;
    }

    public async Task<string> CreateToken(User user)
    {
        var jwtSettings = _configuration.GetSection("JwtSettings");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Secret"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.NameIdentifier, user.Id),
        };

        // Add all user claims (including group claims)
        var userClaims = await _userManager.GetClaimsAsync(user);
        claims.AddRange(userClaims);

        var token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(double.Parse(jwtSettings["ExpiryMinutes"])),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}


namespace TicketTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IdentityContext _context;
        private readonly UserManager<User> _userManager;

        public UsersController(IdentityContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Users
        [HttpGet]
        [AdminGroupAuthorization]
        public async Task<ActionResult<IEnumerable<UserReadDto>>> GetUsers()
        {
            var users = await _context.Users
                .AsNoTracking()
                .Include(u => u.UserGroups)
                    .ThenInclude(ug => ug.Group)
                    .Select(u => UserReadDto.FromModel(u))
                .ToListAsync();

            return Ok(users);
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        [AdminGroupAuthorization]
        public async Task<ActionResult<UserReadDto>> GetUser(string id)
        {
            var user = await _context.Users
                .AsNoTracking()
                .Include(u => u.UserGroups)
                    .ThenInclude(ug => ug.Group)
                    .Select(u => UserReadDto.FromModel(u))
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [AdminGroupAuthorization]
        public async Task<IActionResult> PutUser(string id, [FromBody] UserSaveDto dto)
        {
            if (dto == null)
                return BadRequest();

            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                return NotFound();

            // Update basic fields
            user.UserName = dto.UserName;
            user.Email = dto.Email;
            user.PhoneNumber = dto.PhoneNumber;

            var updateResult = await _userManager.UpdateAsync(user);
            if (!updateResult.Succeeded)
            {
                return BadRequest(updateResult.Errors);
            }

            // Update password: remove existing password (if any) and add the new one
            if (!string.IsNullOrEmpty(dto.Password))
            {
                if (await _userManager.HasPasswordAsync(user))
                {
                    var removePass = await _userManager.RemovePasswordAsync(user);
                    if (!removePass.Succeeded)
                        return BadRequest(removePass.Errors);
                }

                var addPass = await _userManager.AddPasswordAsync(user, dto.Password);
                if (!addPass.Succeeded)
                    return BadRequest(addPass.Errors);
            }

            // Update groups only if provided in the payload. If omitted, do not change groups.
            if (dto.UserGroups != null)
            {
                // Clear existing user-group links
                var existing = _context.UserGroups.Where(ug => ug.UserId == user.Id);
                _context.UserGroups.RemoveRange(existing);

                var groupIds = dto.UserGroups
                    .Where(g => g.Id.HasValue)
                    .Select(g => g.Id!.Value)
                    .Distinct()
                    .ToList();

                // Only add links for groups that exist - fetch group entities
                var groups = await _context.Groups
                    .Where(g => groupIds.Contains(g.Id))
                    .ToListAsync();

                foreach (var grp in groups)
                {
                    _context.UserGroups.Add(new UserGroup
                    {
                        UserId = user.Id,
                        User = user,
                        GroupId = grp.Id,
                        Group = grp
                    });
                }

                await _context.SaveChangesAsync();
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [AdminGroupAuthorization]
        public async Task<ActionResult<User>> PostUser([FromBody] AuthUser model)
        {
            var newUser = new User { UserName = model.Username };
            var result = await _userManager.CreateAsync(newUser, model.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);
   
            return CreatedAtAction("GetUser", new { id = newUser.Id }, newUser);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        [AdminGroupAuthorization]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(string id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
