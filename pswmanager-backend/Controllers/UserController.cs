using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using pswmanager_backend.Dtos;
using pswmanager_backend.Repository;
using pswmanager_backend.Services;

namespace pswmanager_backend.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private IUserService _userService;
    
    public UserController(IUserService userService)
    {
        _userService = userService;
    }
    [HttpGet(Name = "GetUsers")]
    public IActionResult GetUsers()
    {
        return Ok(_userService.GetAllUsers());
    }
    
    [HttpGet("{id}", Name = "GetUserById")]
    public IActionResult GetUserById(int id)
    {
        var user = _userService.GetUserById(id);
        if (user != null)
        {
            return Ok(user);
        }
        return Conflict("Can't find the user");
    }
    
    [HttpGet("{id}/vault", Name = "GetVaultByUserId")]
    public IActionResult GetVaultByUserId(int id)
    {
        var user = _userService.GetUserById(id);
        if (user == null)
        {
            return Conflict("Can't find the user");
        }
        var base64String = Convert.ToBase64String(user.Vault);
        
        var response = new
        {
            vault = base64String
        };
        return Ok(response);
    }
    
    [HttpPut("vault")]
    public IActionResult UpdateUserVault([FromBody] UpdateVaultDTO updateVaultDto)
    {
        var result = _userService.UpdateVault(updateVaultDto.UserId, updateVaultDto.Vault);

        var response = new
        {
            message = "Vault updated successfully!"
        };
        
        if (result)
        {
            return Ok(response);
        }

        return NotFound("User not found");
    }
    
    
    }