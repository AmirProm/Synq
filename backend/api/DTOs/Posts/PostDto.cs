namespace API.DTOs;

public class PostDto
{
    public string Id { get; set; } = null!;
    public string UserName { get; set; } = null!;
    public string Caption { get; set; } = string.Empty;
    public string PhotoUrl { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
