using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Examium.DTOs;
using Examium.Models;
using Examium.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace Examium.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class OptionController : ControllerBase
    {
        private readonly IOptionService _optionService;

        public OptionController(IOptionService optionService)
        {
            _optionService = optionService;
        }

        [HttpPost("Add")]
        public async Task<ActionResult> AddOptionToQuestion(OptionDto optionDto)
        {
            await _optionService.AddOptionToQuestionAsync(optionDto);
            return Ok();
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteOptionFromQuestion(int id)
        {
            await _optionService.DeleteOptionFromQuestionAsync(id);
            return NoContent();
        }

        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateOption(int id, OptionDto optionDto)
        {
            await _optionService.UpdateOption(id, optionDto);
            return NoContent();
        }

        [HttpGet("GetAllOptionsFromQuestions/{questionId}")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Option>>> GetAllOptionsFromQuestionAsync(int questionId)
        {
            var options = await _optionService.GetAllOptionsFromQuestionAsync(questionId);
            return Ok(options);
        }

        [HttpGet("GetAllOptions")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Option>>> GetAllOptionsAsync()
        {
            var options = await _optionService.GetAllOptionsAsync();
            return Ok(options);
        }
    }
}