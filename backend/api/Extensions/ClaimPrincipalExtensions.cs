using System.Security.Claims;

namespace api.Extensions;

public static class ClaimPrincipalExtensions
{
    public static string? GetUserId(this ClaimsPrincipal user)
    {
        return user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    }
    public static string? GetUserName(this ClaimsPrincipal user)
       => user.FindFirstValue(ClaimTypes.Name) ?? user.FindFirstValue("unique_name");

}

// Type: Email
// Value: null

// Type: Name
// Value: Parsa

// Type: NameIdentirfier
// Value: UserId