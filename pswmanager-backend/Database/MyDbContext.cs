using Microsoft.EntityFrameworkCore;
using pswmanager_backend.Entities;

public class MyDbContext : DbContext
{
    public MyDbContext(DbContextOptions<MyDbContext> options): base(options){}
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
            
    }
    
    public virtual DbSet<UserEntity> Users { get; set; }
}