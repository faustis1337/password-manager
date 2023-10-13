namespace pswmanager_backend.Database;

public class DbInitialize : IDbInitialize
{
    private MyDbContext _dbContext;

    public DbInitialize(MyDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    public void InitData()
    {
        _dbContext.Database.EnsureDeleted();
        _dbContext.Database.EnsureCreated();
    }
}