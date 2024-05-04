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
    public class AdminRegistrationController : ControllerBase
    {
        private readonly IAdminRegistrationService _adminRegistrationService;

        public AdminRegistrationController(IAdminRegistrationService adminRegistrationService)
        {
            _adminRegistrationService = adminRegistrationService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAdmin([FromBody] LoginDto adminRegistrationDto)
        {
            try
            {
                await _adminRegistrationService.RegisterAdminAsync(adminRegistrationDto.Username, adminRegistrationDto.Password);
                return Ok("Admin registered successfully.");
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}