using System.Security.Cryptography;
using System.Text;

namespace pswmanager_backend.Services;

public class Hashing : IHashing
{
    public string Hash(string input, string salt,int iterations, int keySize)
    {
        byte[] inputBytes = Encoding.UTF8.GetBytes(input);
        byte[] saltBytes = Encoding.UTF8.GetBytes(salt);

        using (Rfc2898DeriveBytes pbkdf2 =
               new Rfc2898DeriveBytes(inputBytes, saltBytes, iterations, HashAlgorithmName.SHA256))
        {
            byte[] derivedKeyBytes = pbkdf2.GetBytes(keySize * 4);

            string derivedKeyHex = BitConverter.ToString(derivedKeyBytes).Replace("-", "").ToLower();

            return derivedKeyHex;
        }
    }

    public string GetHashedAuthKey(string authKey, string salt)
    {
        var hashedAuthKey = Hash(authKey,salt,500000,5);
        return hashedAuthKey;
    }

    public string GenerateSalt()
    {
        int saltLength = 8;
        
        byte[] salt = new byte[saltLength];
        
        using (RNGCryptoServiceProvider rngCsp = new RNGCryptoServiceProvider())
        {
            rngCsp.GetBytes(salt);
        }
        
        string saltHex = BitConverter.ToString(salt).Replace("-", "").ToLower();

        return saltHex;
    }
}