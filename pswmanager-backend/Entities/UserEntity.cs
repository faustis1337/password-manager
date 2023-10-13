using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pswmanager_backend.Entities;

public class UserEntity
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string AuthKey { get; set; }
    public string Salt { get; set; }
    
    public byte[] Vault { get; set; }
}