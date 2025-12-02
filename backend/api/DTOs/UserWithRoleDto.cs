namespace api.DTOs;

public record UserWithRoleDto(
    string UserName,
    IEnumerable<string> Roles
);