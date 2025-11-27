using System.Runtime.InteropServices;

namespace api.DTOs;

public class LoggedInDto
{
    public string? Token { get; init; }
    public string? Email { get; init; }
    public string? UserName { get; init; }
    public bool IsWrongCreds { get; set; }
    public List<string> Errors { get; set; } = [];
    public string? ProfilePhotoUrl { get; init; }
}

// public record LoggedInDto(
//     string Email,
//     string UserName,
//     int Age,
//     string Token,
//     [Optional] string? ProfilePhotoUrl
// );
