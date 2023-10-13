using pswmanager_backend.Models;

namespace pswmanager_backend.Services;

public interface ITokenService
{
    JwtToken GenerateJwtToken(int id, string email);
}