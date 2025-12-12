using api.Helpers;

namespace api.Interfaces;

public interface IMemberRepository
{
    public Task<PagedList<AppUser>> GetAllAsync(PaginationParams paginationParams, CancellationToken cancellationToken);

    public Task<MemberDto?> GetByUserNameAsync(string userName, CancellationToken cancellationToken);
}
