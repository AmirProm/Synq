using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace api.Models;

public record ChatMessage(
    [property: BsonId, BsonRepresentation(BsonType.ObjectId)]
    string? Id, // hamishe sabet
    string User,
    string Message,
    DateTime TimeStamp
);
