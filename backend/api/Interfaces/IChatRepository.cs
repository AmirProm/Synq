using api.Models;

namespace api.Interfaces;

public interface IChatRepository
{
    public Task SavedMessageAsync(ChatMessage message);
    public Task<List<ChatMessage>> GetMessageAsync();
}