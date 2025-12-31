namespace api.Models;

public record Follow(
    string? Schema,
    [property: BsonId, BsonRepresentation(BsonType.ObjectId)] ObjectId Id,
    ObjectId? FollowerId,
    ObjectId? FollowedMemberId
);
