namespace api.Interfaces;

public interface IPhotoService
{
    public Task<string[]?> AddPhotoToDiskAsync(IFormFile file, ObjectId userId);

    public Task<bool> DeletePhotoFromDisk(Photo photo);
    Task<string> SavePostPhotoAsync(IFormFile file, string userName, CancellationToken ct = default);
}
