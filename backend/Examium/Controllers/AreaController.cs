using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Examium.DTOs;
using Examium.Models;
using Examium.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Examium.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class AreaController : ControllerBase
    {
        private readonly IAreaService _areaService;

        public AreaController(IAreaService areaService)
        {
            _areaService = areaService;
        }

        [HttpGet("GetAll")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Area>>> GetAllAreas()
        {
            var areas = await _areaService.GetAllAreasAsync();
            return Ok(areas);
        }

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Area>> GetAreaById(int id)
        {
            var area = await _areaService.GetAreaByIdAsync(id);
            if (area == null)
            {
                return NotFound();
            }
            return Ok(area);
        }

        [HttpPost("Add")]
        public async Task<ActionResult> AddArea(AreaDto areaDto)
        {
            await _areaService.AddAreaAsync(areaDto);
            return Ok();
        }


        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateArea(int id, AreaDto areaDto)
        {
            await _areaService.UpdateAreaAsync(id, areaDto);
            return NoContent();
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteArea(int id)
        {
            await _areaService.DeleteAreaAsync(id);
            return NoContent();
        }
    }
}
