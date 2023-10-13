using Microsoft.AspNetCore.Mvc;
using pswmanager_backend.Entities;

namespace pswmanager_backend.Repository;

public interface IUserRepository
{
    bool Register(string email, string authKey,string salt,byte[] vault);
    List<UserEntity> GetAllUsers();
    UserEntity? GetUserById(int id);
    UserEntity? GetUserByEmail(string email);
    bool UpdateVault(int userId, byte[] newVault);
}