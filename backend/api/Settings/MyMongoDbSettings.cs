namespace api.Settings;
public class MyMongoDbSettings : IMyMongoDbSettings
{
    public string? ConnectionString { get; init; }
    public string? DatabaseName { get; init; }
}
