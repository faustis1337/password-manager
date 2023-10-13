using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using pswmanager_backend.Dtos;
using pswmanager_backend.Services;

namespace pswmanager_backend.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private IUserService _userService;
    private ITokenService _tokenService;
    
    public AuthController(IUserService userService,ITokenService tokenService)
    {
        _userService = userService;
        _tokenService = tokenService;
    }
    
    [AllowAnonymous]
    [HttpPost("Register")]
    public IActionResult Register([FromBody] RegisterUserDTO registerUserDto)
    {
        var isUserRegistered = _userService.Register(registerUserDto.Email, registerUserDto.AuthKey,registerUserDto.Vault);
        if (isUserRegistered)
        {
            var response = new
            {
                message = "User has been registered!"
            };
            
            return Ok(response);
        }
        
        return Conflict("User could not be created!");
    }
    [AllowAnonymous]
    [HttpPost("Login")]
    public IActionResult Login([FromBody] LoginUserDTO loginUserDto)
    {
        var authenticatedUser = _userService.AuthenticateUser(loginUserDto.Email, loginUserDto.AuthKey);
        if (authenticatedUser == null){
            return Unauthorized("Incorrect credentials");
        }

        var jwt = _tokenService.GenerateJwtToken(authenticatedUser.Id, authenticatedUser.Email);
        return Ok(jwt);
    }
    
}