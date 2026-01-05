using API.Entities;
using API.Interfaces;
using MongoDB.Driver;

namespace API.Repositories;

public class PostRepository : IPostRepository
{
    private readonly IMongoCollection<Post> _posts;

    public PostRepository(IMongoClient client, IMyMongoDbSettings dbSettings)
    {
        var dbName = client.GetDatabase(dbSettings.DatabaseName);
        _posts = dbName.GetCollection<Post>("posts");
    }

    public async Task<IReadOnlyList<Post>> GetFeedAsync(int pageNumber, int pageSize, CancellationToken ct = default)
    {
        pageNumber = Math.Max(1, pageNumber);
        pageSize = Math.Clamp(pageSize, 1, 50);

        return await _posts.Find(FilterDefinition<Post>.Empty)
            .SortByDescending(x => x.CreatedAt)
            .Skip((pageNumber - 1) * pageSize)
            .Limit(pageSize)
            .ToListAsync(ct);
    }

    public async Task<IReadOnlyList<Post>> GetByUserNameAsync(string userName, int pageNumber, int pageSize, CancellationToken ct = default)
    {
        pageNumber = Math.Max(1, pageNumber);
        pageSize = Math.Clamp(pageSize, 1, 50);

        var filter = Builders<Post>.Filter.Eq(x => x.UserName, userName);

        return await _posts.Find(filter)
            .SortByDescending(x => x.CreatedAt)
            .Skip((pageNumber - 1) * pageSize)
            .Limit(pageSize)
            .ToListAsync(ct);
    }

    public Task<long> CountAllAsync(CancellationToken ct = default)
        => _posts.CountDocumentsAsync(FilterDefinition<Post>.Empty, cancellationToken: ct);

    public Task<long> CountByUserNameAsync(string userName, CancellationToken ct = default)
    {
        var filter = Builders<Post>.Filter.Eq(x => x.UserName, userName);
        return _posts.CountDocumentsAsync(filter, cancellationToken: ct);
    }

    public async Task<Post> CreateAsync(Post post, CancellationToken ct = default)
    {
        post.CreatedAt = DateTime.UtcNow;
        await _posts.InsertOneAsync(post, cancellationToken: ct);
        return post;
    }

    public async Task<bool> UpdateCaptionAsync(string id, string userName, string newCaption, CancellationToken ct = default)
    {
        var filter = Builders<Post>.Filter.Eq(x => x.Id, id) &
                     Builders<Post>.Filter.Eq(x => x.UserName, userName);

        var update = Builders<Post>.Update.Set(x => x.Caption, newCaption);

        var res = await _posts.UpdateOneAsync(filter, update, cancellationToken: ct);
        return res.ModifiedCount > 0;
    }

    public async Task<bool> DeleteAsync(string id, string userName, CancellationToken ct = default)
    {
        var filter = Builders<Post>.Filter.Eq(x => x.Id, id) &
                     Builders<Post>.Filter.Eq(x => x.UserName, userName);

        var res = await _posts.DeleteOneAsync(filter, ct);
        return res.DeletedCount > 0;
    }
}
