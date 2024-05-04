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
    public class QuestionController : ControllerBase
    {
        private readonly IQuestionService _questionService;

        public QuestionController(IQuestionService questionService)
        {
            _questionService = questionService;
        }

        [HttpGet("GetAll")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Question>>> GetAllQuestions()
        {
            var questions = await _questionService.GetAllQuestionsAsync();
            return Ok(questions);
        }

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Question>> GetQuestionById(int id)
        {
            var question = await _questionService.GetQuestionByIdAsync(id);
            if (question == null)
            {
                return NotFound();
            }
            return Ok(question);
        }

        [HttpPost("Add")]
        public async Task<ActionResult> AddQuestion(QuestionDto questionDto)
        {
            await _questionService.AddQuestionAsync(questionDto);
            return Ok();
        }

        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateQuestion(int id, QuestionDto questionDto)
        {
            await _questionService.UpdateQuestionAsync(id, questionDto);
            return NoContent();
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteQuestion(int id)
        {
            await _questionService.DeleteQuestionAsync(id);
            return NoContent();
        }

    }
}
