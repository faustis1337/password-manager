using pswmanager_backend.Entities;

namespace pswmanager_backend.Services;

public interface IUserService
{
    bool Register(string email, string authKey,byte[] vault);
    UserEntity? AuthenticateUser(string email, string authKey);
    List<UserEntity> GetAllUsers();
    UserEntity? GetUserById(int id);
    public bool UpdateVault(int userId, byte[] newVault);
}