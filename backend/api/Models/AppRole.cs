
using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace api.Models;

[CollectionName("roles")]
public class AppRole : MongoIdentityRole<ObjectId>
{
}
