using Microsoft.AspNetCore.Http;

namespace API.DTOs;

public class CreatePostWithPhotoDto
{
    public string Caption { get; set; } = string.Empty;
    public IFormFile File { get; set; } = null!;
}
