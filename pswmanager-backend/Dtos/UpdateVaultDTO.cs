namespace pswmanager_backend.Dtos;

public class UpdateVaultDTO
{
    public int UserId { get; set; }
    public byte[] Vault { get; set; }
}