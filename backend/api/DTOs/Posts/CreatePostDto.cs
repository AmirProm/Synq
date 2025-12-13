namespace API.DTOs;

public class CreatePostDto
{
    public string Caption { get; set; } = string.Empty;
    public string PhotoUrl { get; set; } = string.Empty; // فعلاً URL
}
