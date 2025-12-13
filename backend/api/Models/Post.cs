using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace API.Entities;

public class Post
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = null!;

    public string UserName { get; set; } = null!;

    public string Caption { get; set; } = string.Empty;

    // فعلاً MVP: فقط یک عکس (بعداً می‌تونی List<Media> کنی)
    public string PhotoUrl { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
