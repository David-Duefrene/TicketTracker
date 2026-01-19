using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using TicketTracker.Models;

namespace TicketTracker.DTO
{
    /// <summary>
    /// Response DTO: contains only the fields the API should expose for a user.
    /// </summary>
    public class UserReadDto
    {
        public required string Id { get; init; }
        public required string UserName { get; init; }
        public string? Email { get; init; }
        public string? PhoneNumber { get; init; }

        public List<UserGroupDto> UserGroups { get; init; } = new();

        public static UserReadDto FromModel(User user)
        {
            // Expect that User.UserGroups and each UserGroup.Group navigation property are loaded.
            return new UserReadDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                UserGroups = user.UserGroups?
                              .Select(ug => new UserGroupDto
                              {
                                  GroupId = ug.GroupId,
                                  Name = ug.Group?.Name ?? string.Empty
                              })
                              .ToList() ?? new List<UserGroupDto>()
            };
        }
    }

    /// <summary>
    /// DTO for the groups returned inside a UserReadDto.
    /// </summary>
    public class UserGroupDto
    {
        public int GroupId { get; init; }
        public required string Name { get; init; }
    }

    /// <summary>
    /// Create DTO: same fields as the read DTO except Id.
    /// The Groups list accepts either GroupId, Name, or a mix (see <see cref="GroupRefDto"/>).
    /// </summary>
    public class UserCreateDto : IValidatableObject
    {
        [Required]
        public required string UserName { get; init; }

        [Required]
        [EmailAddress]
        public required string Email { get; init; }

        public string? PhoneNumber { get; init; }

        /// <summary>
        /// List of group references. Each element must specify either GroupId or Name (or both).
        /// </summary>
        public List<GroupRefDto> Groups { get; init; } = new();

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Groups == null || !Groups.Any())
            {
                yield return new ValidationResult("At least one group reference is required.", new[] { nameof(Groups) });
                yield break;
            }

            for (var i = 0; i < Groups.Count; i++)
            {
                var group = Groups[i];
                if (!group.IsValid())
                {
                    yield return new ValidationResult(
                        "Each group reference must contain either a valid GroupId or a non-empty Name.",
                        new[] { $"{nameof(Groups)}[{i}]" });
                }
            }
        }
    }

    /// <summary>
    /// Accepts either GroupId or Name (or both). Validation helper included.
    /// </summary>
    public class GroupRefDto
    {
        /// <summary>
        /// Optional GroupId. If supplied the server should prefer resolving by id.
        /// </summary>
        public int? GroupId { get; init; }

        /// <summary>
        /// Optional Group name. If supplied and GroupId is null the server should resolve/create by name.
        /// </summary>
        public string? Name { get; init; }

        public bool IsValid()
        {
            return GroupId.HasValue || !string.IsNullOrWhiteSpace(Name);
        }
    }

    /// <summary>
    /// New DTO used for creating or updating a user via the API.
    /// Accepts only: UserName (required), Email (required), Password (required), PhoneNumber (optional),
    /// and an optional list of userGroups (each referenced by Id). Optional properties can be omitted.
    /// </summary>
    public class UserSaveDto
    {
        [Required]
        public required string UserName { get; init; }

        [Required]
        [EmailAddress]
        public required string Email { get; init; }

        [Required]
        public required string Password { get; init; }

        public string? PhoneNumber { get; init; }

        /// <summary>
        /// Optional list of user group references; only the Id is used when provided.
        /// If omitted the user's groups won't be changed by PUT.
        /// </summary>
        public List<UserGroupIdDto>? UserGroups { get; init; }
    }

    /// <summary>
    /// Simple DTO to reference an existing group by Id when creating/updating a user.
    /// </summary>
    public class UserGroupIdDto
    {
        public int? Id { get; init; }
    }
}
