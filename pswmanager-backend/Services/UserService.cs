using pswmanager_backend.Entities;
using pswmanager_backend.Repository;

namespace pswmanager_backend.Services;

public class UserService : IUserService
{
    private IUserRepository _userRepository;
    private readonly IHashing _hashing;
    

    public UserService(IUserRepository userRepository,IHashing hashing)
    {
        _userRepository = userRepository;
        _hashing = hashing;

    }
    
    public bool Register(string email, string authKey,byte[] vault)
    {
        var salt = _hashing.GenerateSalt();
        var hashedAuthKey = _hashing.GetHashedAuthKey(authKey, salt);
        if (_userRepository.Register(email, hashedAuthKey, salt,vault))
        {
            return true;
        }

        return false;
    }
    
    public UserEntity? AuthenticateUser(string email, string authKey)
    {

        var user = _userRepository.GetUserByEmail(email);
        if (user == null)
        {
            return null;
        }
        
        var hashedAuthKey = _hashing.GetHashedAuthKey(authKey, user.Salt);

        if (hashedAuthKey == user.AuthKey)
        {
            return user;
        }

        return null;
    }

    public List<UserEntity> GetAllUsers()
    {
        return _userRepository.GetAllUsers();
    }

    public UserEntity? GetUserById(int id)
    {
        return _userRepository.GetUserById(id);
    }

    public bool UpdateVault(int userId, byte[] newVault)
    {
        if (_userRepository.UpdateVault(userId,newVault))
        {
            return true;
        }

        return false;
    }
}