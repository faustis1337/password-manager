namespace pswmanager_backend.Dtos;

public class RegisterUserDTO
{
    public String Email { get; set; }
    public String AuthKey { get; set; }
    public byte[] Vault { get; set; }
}