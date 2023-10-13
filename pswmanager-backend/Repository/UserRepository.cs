using pswmanager_backend.Entities;

namespace pswmanager_backend.Repository;

public class UserRepository : IUserRepository

{
    private MyDbContext _dbContext;

    public UserRepository(MyDbContext dbContext)
    {
        _dbContext = dbContext ?? throw new InvalidDataException("No DB context found");
    }

    public bool Register(string email, string authKey, string salt,byte[] vault)
    {
        var existingUser = _dbContext.Users.FirstOrDefault(u => u.Email == email);

        if (existingUser != null)
        {
            return false;
        }
        
        var userToRegister = new UserEntity{Email = email,AuthKey = authKey, Salt = salt,Vault = vault};
        _dbContext.Users.Add(userToRegister);
        _dbContext.SaveChanges();
        return true;
    }

    public List<UserEntity> GetAllUsers()
    {
        return _dbContext.Users.ToList();
    }
    
    public UserEntity? GetUserById(int id)
    {
        var user = _dbContext.Users.FirstOrDefault(u => u.Id == id);
        return user;
    }
    
    public UserEntity? GetUserByEmail(string email)
    {
        var user = _dbContext.Users.FirstOrDefault(u => u.Email == email);
        return user;
    }
    
    public bool UpdateVault(int userId, byte[] newVault)
    {
        var user = _dbContext.Users.FirstOrDefault(u => u.Id == userId);

        if (user == null)
        {
            return false; 
        }

        user.Vault = newVault;
        _dbContext.SaveChanges();
        return true;
    }
}