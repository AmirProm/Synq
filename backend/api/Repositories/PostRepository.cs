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
    //mongo settings

    public async Task<Post> CreateAsync(Post post)
    {
        post.CreatedAt = DateTime.UtcNow;
        post.UpdatedAt = DateTime.UtcNow;
        await _posts.InsertOneAsync(post);
        return post;
    }

    public async Task<Post?> GetByIdAsync(string id)
    {
        return await _posts.Find(p => p.Id == id).FirstOrDefaultAsync();
    }

    public async Task<IReadOnlyList<Post>> GetFeedAsync(int pageNumber, int pageSize)
    {
        pageNumber = Math.Max(1, pageNumber);
        pageSize = Math.Clamp(pageSize, 1, 50);

        return await _posts.Find(_ => true)
            .SortByDescending(p => p.CreatedAt)
            .Skip((pageNumber - 1) * pageSize)
            .Limit(pageSize)
            .ToListAsync();
    }

    public async Task<IReadOnlyList<Post>> GetByUserNameAsync(string userName, int pageNumber, int pageSize)
    {
        pageNumber = Math.Max(1, pageNumber);
        pageSize = Math.Clamp(pageSize, 1, 50);

        return await _posts.Find(p => p.UserName == userName)
            .SortByDescending(p => p.CreatedAt)
            .Skip((pageNumber - 1) * pageSize)
            .Limit(pageSize)
            .ToListAsync();
    }

    public async Task<bool> UpdateCaptionAsync(string id, string userName, string caption)
    {
        var update = Builders<Post>.Update
            .Set(p => p.Caption, caption)
            .Set(p => p.UpdatedAt, DateTime.UtcNow);

        var res = await _posts.UpdateOneAsync(
            p => p.Id == id && p.UserName == userName,
            update
        );

        return res.ModifiedCount > 0;
    }

    public async Task<bool> DeleteAsync(string id, string userName)
    {
        var res = await _posts.DeleteOneAsync(p => p.Id == id && p.UserName == userName);
        return res.DeletedCount > 0;
    }
}
