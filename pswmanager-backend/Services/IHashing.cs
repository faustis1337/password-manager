namespace pswmanager_backend.Services;

public interface IHashing
{
    public string Hash(string input, string salt, int iterations, int keySize);

    public string GetHashedAuthKey(string authKey,string salt);

    public string GenerateSalt();
}