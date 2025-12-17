using API.Entities;

namespace API.Interfaces;

public interface IPostRepository
{
    Task<IReadOnlyList<Post>> GetFeedAsync(int pageNumber, int pageSize, CancellationToken ct = default);
    Task<IReadOnlyList<Post>> GetByUserNameAsync(string userName, int pageNumber, int pageSize, CancellationToken ct = default);
    Task<long> CountAllAsync(CancellationToken ct = default);
    Task<long> CountByUserNameAsync(string userName, CancellationToken ct = default);
    Task<Post> CreateAsync(Post post, CancellationToken ct = default);
    Task<bool> UpdateCaptionAsync(string id, string userName, string newCaption, CancellationToken ct = default);
    Task<bool> DeleteAsync(string id, string userName, CancellationToken ct = default);
}
