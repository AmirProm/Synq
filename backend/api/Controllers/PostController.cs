using System.Security.Claims;
using api.Extensions;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class PostsController : BaseApiController
{
    private readonly IPostRepository _repo;
    private readonly IPhotoService _photoService;

    public PostsController(IPostRepository repo, IPhotoService photoService)
    {
        _repo = repo;
        _photoService = photoService;
    }

    [Authorize]
    [HttpPost("create-with-photo")]
    public async Task<ActionResult<PostDto>> CreateWithPhoto([FromForm] CreatePostWithPhotoDto dto, CancellationToken ct)
    {
        var userName = User.GetUserName();
        if (string.IsNullOrWhiteSpace(userName)) return Unauthorized();

        if (dto.File is null || dto.File.Length == 0) return BadRequest("No file selected");

        var photoUrl = await _photoService.SavePostPhotoAsync(dto.File, userName, ct);

        var post = new Post
        {
            UserName = userName,
            Caption = dto.Caption ?? "",
            PhotoUrl = photoUrl
        };

        var created = await _repo.CreateAsync(post, ct);
        return Ok(ToDto(created));
    }

    [HttpGet("feed")]
    public async Task<ActionResult<IReadOnlyList<PostDto>>> GetFeed([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, CancellationToken ct = default)
    {
        var posts = await _repo.GetFeedAsync(pageNumber, pageSize, ct);
        return Ok(posts.Select(ToDto));
    }

    [HttpGet("user/{userName}")]
    public async Task<ActionResult<IReadOnlyList<PostDto>>> GetByUser(string userName, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, CancellationToken ct = default)
    {
        var posts = await _repo.GetByUserNameAsync(userName, pageNumber, pageSize, ct);
        return Ok(posts.Select(ToDto));
    }

    [Authorize]
    [HttpGet("my/count")]
    public async Task<ActionResult<long>> MyPostCount(CancellationToken ct)
    {
        var userName = User.GetUserName();
        if (string.IsNullOrWhiteSpace(userName)) return Unauthorized();

        var count = await _repo.CountByUserNameAsync(userName, ct);
        return Ok(count);
    }

    [HttpGet("user/{userName}/count")]
    public async Task<ActionResult<long>> UserPostCount(string userName, CancellationToken ct)
    {
        var count = await _repo.CountByUserNameAsync(userName, ct);
        return Ok(count);
    }

    // [Authorize]
    // [HttpPost]
    // public async Task<ActionResult<PostDto>> Create(CreatePostDto dto, CancellationToken ct)
    // {
    //     var userName = User.GetUserName();
    //     if (string.IsNullOrWhiteSpace(userName)) return Unauthorized();

    //     var post = new Post
    //     {
    //         UserName = userName,
    //         Caption = dto.Caption ?? "",
    //         PhotoUrl = dto.PhotoUrl ?? ""
    //     };

    //     var created = await _repo.CreateAsync(post, ct);
    //     return Ok(ToDto(created));
    // }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<ActionResult> Update(string id, UpdatePostDto dto, CancellationToken ct)
    {
        var userName = User.GetUserName();
        if (string.IsNullOrWhiteSpace(userName)) return Unauthorized();

        var ok = await _repo.UpdateCaptionAsync(id, userName, dto.Caption ?? "", ct);
        return ok ? NoContent() : Forbid();
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(string id, CancellationToken ct)
    {
        var userName = User.GetUserName();
        if (string.IsNullOrWhiteSpace(userName)) return Unauthorized();

        var ok = await _repo.DeleteAsync(id, userName, ct);
        return ok ? NoContent() : Forbid();
    }

    private static PostDto ToDto(Post p) => new()
    {
        Id = p.Id,
        UserName = p.UserName,
        Caption = p.Caption,
        PhotoUrl = p.PhotoUrl,
        CreatedAt = p.CreatedAt
    };
}
