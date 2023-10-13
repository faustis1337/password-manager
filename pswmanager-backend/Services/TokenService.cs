using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using pswmanager_backend.Models;

namespace pswmanager_backend.Services;

public class TokenService : ITokenService
{

    public TokenService(IConfiguration configuration)
    {
        Configuration = configuration;
    }
    public IConfiguration Configuration { get; }

    public JwtToken GenerateJwtToken(int id, string email)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(Configuration["Jwt:Secret"]);
        
        var claims = new List<Claim>
        {
            new Claim("UserEmail", email),
            new Claim("UserId", id.ToString()),
        };
        
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddMinutes(120),
            Issuer = Configuration["Jwt:Issuer"],
            Audience = Configuration["Jwt:Audience"],
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
            
        return new JwtToken
        {
            Token = tokenHandler.WriteToken(token),
            Message = "Ok"
        };
    }
}