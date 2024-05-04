using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Examium.DTOs;
using Examium.Models;
using Examium.Repositories.Interfaces;
using Examium.Services.Interfaces;

namespace Examium.Services.Implementations
{
    public class QuestionService : IQuestionService
    {
        private readonly IQuestionRepository _questionRepository;

        public QuestionService(IQuestionRepository questionRepository)
        {
            _questionRepository = questionRepository;
        }

        public async Task<IEnumerable<Question>> GetAllQuestionsAsync()
        {
            return await _questionRepository.GetAllQuestionsAsync();
        }

        public async Task<Question> GetQuestionByIdAsync(int id)
        {
            return await _questionRepository.GetQuestionByIdAsync(id);
        }

        public async Task AddQuestionAsync(QuestionDto questionDto)
        {
            await _questionRepository.AddQuestionAsync(questionDto);
        }

        public async Task UpdateQuestionAsync(int questionId, QuestionDto questionDto)
        {
            await _questionRepository.UpdateQuestionAsync(questionId, questionDto);
        }

        public async Task DeleteQuestionAsync(int id)
        {
            await _questionRepository.DeleteQuestionAsync(id);
        }

    }
}
