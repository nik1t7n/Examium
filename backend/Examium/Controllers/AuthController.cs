using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Examium.DTOs;
using Examium.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Examium.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ITokenService _tokenService;

        public AuthController(IAuthService authService, ITokenService tokenService)
        {
            _authService = authService;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            // Проверяем аутентификацию
            var isAuthenticated = await _authService.AuthenticateAsync(loginDto.Username, loginDto.Password);

            if (isAuthenticated)
            {
                // Если аутентификация успешна, генерируем токен и возвращаем его
                var token = _tokenService.GenerateToken(loginDto.Username);
                return Ok(new { Token = token });
            }

            // Если аутентификация не удалась, возвращаем ошибку
            return Unauthorized();
        }
    }
}